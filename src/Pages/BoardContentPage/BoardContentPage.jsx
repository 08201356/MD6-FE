import React, {useEffect, useState} from 'react';
import HomeHeader from "../../Components/HomeHeader/HomeHeader";
import ListColumns from "../../Components/BoardContent/ListColumns/ListColumns";
import CreateColumnButton from "../../Components/BoardContent/CreateColumnButton";
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
import column from "../../Components/BoardContent/ListColumns/Column/Column";
import {cloneDeep} from "lodash";

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContentPage = ({board}) => {
    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/trelloimageupload.appspot.com/o/data%2F56b1e5cc-ecb3-490b-a3e0-a3d2792f4016?alt=media&token=d61aaa92-8c0b-4620-9f37-b342343fe888'
    const divStyle = {
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    const [orderedColumns, setOrderedColumns] = useState([])

    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    const [oldColumn, setOldColumn] = useState(null)

    const pointerSensor = useSensor(PointerSensor, {activationConstraint: {distance: 10}})
    const sensors = useSensors(pointerSensor)

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])


    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
    }


    const handleDragStart = (event) => {
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)

        if (event?.active?.data?.current?.columnId) {
            setOldColumn(findColumnByCardId(event?.active?.id))
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

        if (activeColumn._id !== overColumn._id) {
            setOrderedColumns(prevColumns => {
                const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
                let newCardIndex

                const isBelowOverItem = active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height;
                const modifier = isBelowOverItem ? 1 : 0;

                newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

                const nextColumns = cloneDeep(prevColumns)
                const nextActiveColumns = nextColumns.find(column => column._id === activeColumn._id)
                const nextOverColumns = nextColumns.find(column => column._id === overColumn._id)

                if (nextActiveColumns) {
                    nextActiveColumns.cards = nextActiveColumns.cards.filter(card => card._id !== activeDraggingCardId)
                    nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(card => card._id)
                }

                if (nextOverColumns) {
                    nextOverColumns.cards = nextOverColumns.cards.filter(card => card._id !== activeDraggingCardId)
                    nextOverColumns.cards = nextOverColumns.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
                    nextOverColumns.cardOrderIds = nextOverColumns.cards.map(card => card._id)
                }
                return nextColumns;
            })
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

            if (oldColumn._id !== overColumn._id) {

            } else {
                const oldCardIndex = oldColumn?.cards?.findIndex(c => c._id === activeDragItemId)
                const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
                const dndOrderedCards = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)
                setOrderedColumns(prevColumns => {
                    const nextColumns = cloneDeep(prevColumns)
                    const targetColumn = nextColumns.find(column => column._id === overColumn._id)

                    targetColumn.cards = dndOrderedCards
                    targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
                    return nextColumns
                })
            }
        }

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
                const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)

                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
                const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

                setOrderedColumns(dndOrderedColumns)
            }
        }



        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumn(null)
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

            {/*<div>*/}
            {/*    <p>{board.title}</p>*/}
            {/*</div>*/}

            <div className='h-full' style={divStyle}>
                <DndContext sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDragEnd={handleDragEnd}
                >
                    <div className='flex h-full p-3 space-x-4 max-w-full overflow-x-scroll'>
                        <ListColumns columns={orderedColumns}/>
                        <DragOverlay dropAnimation={customDropAnimation}>
                            {!activeDragItemType && null}
                            {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) &&
                                <Column column={activeDragItemData}/>}
                            {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) &&
                                <CardContent card={activeDragItemData}/>}
                        </DragOverlay>
                        <CreateColumnButton/>
                    </div>
                </DndContext>
            </div>
        </div>
    );
};

export default BoardContentPage;