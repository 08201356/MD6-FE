import React, {useContext, useEffect, useState} from 'react';
import HomeHeader from "../../Components/HomeHeader/HomeHeader";
import ListColumns from "../../Components/BoardContent/ListColumns/ListColumns";
import {
    closestCorners,
    defaultDropAnimationSideEffects,
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {mapOrder} from "../../Utils/Sort";
import {arrayMove} from "@dnd-kit/sortable";
import Column from "../../Components/BoardContent/ListColumns/Column/Column";
import CardContent from "../../Components/BoardContent/ListColumns/Column/ListCards/CardContent/CardContent";
import {cloneDeep, isEmpty} from "lodash";
import BoardContext from "../../Context/BoardContext";
import BoardBar from "../../Components/SideBar/BoardBar";
import BoardService from "../../Service/BoardService";
import ColumnService from "../../Service/ColumnService";
const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContentPage = () => {
    const {board, updateBoard} = useContext(BoardContext);

    useEffect(() => {
        const storedBoard = localStorage.getItem('board');

        if (storedBoard) {
            console.log("store board: ", storedBoard)
            updateBoard(JSON.parse(storedBoard));
        }

        board.columns = mapOrder(board.columns, board.columnOrderIds, 'id')
        board.columns.forEach(column => {

                column.cards = mapOrder(column?.cards, column?.cardOrderIds, 'id')

        })
    }, []);

    const imageUrl = 'https://marketplace.canva.com/EAE-g6znT-s/1/0/1600w/canva-soft-purple-fun-modern-minimalist-cats-hi-desktop-wallpaper-Gqj2XviD4_E.jpg'
    const divStyle = {
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    const [orderedColumns, setOrderedColumns] = useState([])

    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)

    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

    const pointerSensor = useSensor(PointerSensor, {activationConstraint: {distance: 10}})
    const sensors = useSensors(pointerSensor)


    useEffect(() => {
        setOrderedColumns(board.columns)
    }, [board])

    const moveColumns = (dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c.id)
        const newBoard = {...board}

        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds

        updateBoard(newBoard)
        localStorage.setItem('board', JSON.stringify(newBoard));

        BoardService.updateBoardDetail(newBoard.id, {columnOrderIds: dndOrderedColumnsIds})
    }

    const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
        const newBoard = {...board}
        const columnToUpdate = newBoard.columns.find(column => column.id === columnId)
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards
            columnToUpdate.cardOrderIds = dndOrderedCardIds
        }

        updateBoard(newBoard)
        localStorage.setItem('board', JSON.stringify(newBoard));

        ColumnService.updateColumnDetail(columnId, {cardOrderIds: dndOrderedCardIds})
    }

    const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c.id)
        const newBoard = {...board}

        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds

        updateBoard(newBoard)
        localStorage.setItem('board', JSON.stringify(newBoard));

        console.log("Current card ", currentCardId)
        console.log("Prev ", dndOrderedColumns.find(c => c.id === prevColumnId)?.cards)
        console.log("Prev ", dndOrderedColumns.find(c => c.id === prevColumnId)?.cardOrderIds)
        console.log("Next ", dndOrderedColumns.find(c => c.id === nextColumnId)?.cards)
        console.log("Next ", dndOrderedColumns.find(c => c.id === nextColumnId)?.cardOrderIds)

        ColumnService.movingCardToDifferentColumnAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds: dndOrderedColumns.find(c => c.id === prevColumnId)?.cardOrderIds,
            nextColumnId,
            nextCardOrderIds: dndOrderedColumns.find(c => c.id === nextColumnId)?.cardOrderIds
        })
    }

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(column => column?.cards?.map(card => card.id)?.includes(cardId))
    }

    const moveCardBetweenDifferentColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        triggerFrom
    ) => {
        setOrderedColumns(prevColumns => {
            const overCardIndex = overColumn?.cards?.findIndex(card => card.id === overCardId)
            let newCardIndex

            const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top >
                over.rect.top + over.rect.height;
            const modifier = isBelowOverItem ? 1 : 0;

            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

            const nextColumns = cloneDeep(prevColumns)
            const nextActiveColumns = nextColumns.find(column => column.id === activeColumn.id)
            const nextOverColumn = nextColumns.find(column => column.id === overColumn.id)

            if (nextActiveColumns) {
                nextActiveColumns.cards = nextActiveColumns.cards.filter(card => card.id !== activeDraggingCardId)
                nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(card => card.id)
            }

            const rebuild_activeDraggingCardData = {
                ...activeDraggingCardData,
                columnId: nextOverColumn.id
            }

            if (nextOverColumn) {
                nextOverColumn.cards = nextOverColumn.cards.filter(card => card.id !== activeDraggingCardId)
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card.id)
            }

            if (triggerFrom === 'handleDragEnd') {
                moveCardToDifferentColumn(
                    activeDraggingCardId,
                    oldColumnWhenDraggingCard.id,
                    nextOverColumn.id,
                    nextColumns)
            }

            return nextColumns;
        })
    }

    const handleDragStart = (event) => {
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)

        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
        }
    }

    const handleDragOver = (event) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        const {active, over} = event
        if (!active || !over) return

        const {id: activeDraggingCardId, data: {current: activeDraggingCardData}} = active
        const {id: overCardId} = over

        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)

        if (!activeColumn || !overColumn) return

        if (activeColumn.id !== overColumn.id) {
            moveCardBetweenDifferentColumns(
                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData,
                'handleDragOver'
            )
        }
    }

    const handleDragEnd = (event) => {
        const {active, over} = event
        if (!active || !over) return

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
                const {id: activeDraggingCardId, data: {current: activeDraggingCardData}} = active
                const {id: overCardId} = over

                const activeColumn = findColumnByCardId(activeDraggingCardId)
                const overColumn = findColumnByCardId(overCardId)

                if (!activeColumn || !overColumn) return

                if (oldColumnWhenDraggingCard.id !== overColumn.id) {
                    moveCardBetweenDifferentColumns(
                        overColumn,
                        overCardId,
                        active,
                        over,
                        activeColumn,
                        activeDraggingCardId,
                        activeDraggingCardData,
                        'handleDragEnd'
                    )
                } else {
                    const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c.id === activeDragItemId)
                    const newCardIndex = overColumn?.cards?.findIndex(c => c.id === overCardId)
                    const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
                    const dndOrderedCardIds = dndOrderedCards.map(card => card.id)

                    setOrderedColumns(prevColumns => {
                        const nextColumns = cloneDeep(prevColumns)
                        const targetColumn = nextColumns.find(column => column.id === overColumn.id)

                        targetColumn.cards = dndOrderedCards
                        targetColumn.cardOrderIds = dndOrderedCards.map(card => card.id)

                        return nextColumns
                    })

                    moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDraggingCard.id)
                }
        }

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                const oldColumnIndex = orderedColumns.findIndex(c => c.id === active.id)
                const newColumnIndex = orderedColumns.findIndex(c => c.id === over.id)

                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
                setOrderedColumns(dndOrderedColumns)
                moveColumns(dndOrderedColumns)
            }
        }

        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumnWhenDraggingCard(null)
    }

    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    return (
        <div className='h-dvh w-dvw max-w-full overflow-y-hidden'>
            <div>
                <HomeHeader/>
            </div>

            <div>
                <BoardBar/>
            </div>
            <div className='h-full' style={divStyle}>
                <DndContext sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDragEnd={handleDragEnd}
                >
                    <div className='flex h-full p-3 space-x-4 overflow-x-scroll'>
                        <ListColumns columns={orderedColumns} setColumns={setOrderedColumns}/>
                        <DragOverlay dropAnimation={customDropAnimation}>
                            {!activeDragItemType && null}
                            {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) &&
                                <Column column={activeDragItemData}/>}
                            {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) &&
                                <CardContent  card={activeDragItemData} />}
                        </DragOverlay>
                    </div>
                </DndContext >
            </div>
        </div>
    );
};

export default BoardContentPage;