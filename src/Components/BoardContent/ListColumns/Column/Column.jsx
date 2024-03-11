import React, {useEffect, useState} from 'react';
import {Box, Heading, Input, Text} from "@chakra-ui/react";
import {BsThreeDots} from "react-icons/bs";
import ListCards from "./ListCards/ListCards";
import {IoMdAdd, IoMdClose} from "react-icons/io";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import {mapOrder} from "../../../../Utils/Sort";
import CreateNewCardForm from "./ListCards/NewCard/CreateNewCardForm";
import ColumnService from "../../../../Service/ColumnService";

const Column = ({column, setColumn}) => {
    const [isCreateCard, setIsCreateCard] = useState(false)


    const handleCreateCard = () => {
        setIsCreateCard(!isCreateCard)
    }

    const {
        attributes,
        listeners,
        setNodeRef, transform,
        transition,
        isDragging
    } = useSortable({id: column.id, data: {...column}});

    const dndKitColumnStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
        height: '100%'
    };

    const orderedCards = column.cards

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(column.title);

    const handleEditTitle = () => {
        setIsEditing(true);
    };

    const handleSaveTitle = () => {
        setIsEditing(false);
        ColumnService.editColumnName(column.id,editedTitle)
    };

    const handleCancelEdit = () => {
        setEditedTitle(column.title);
        setIsEditing(false);
    };
    const handleBlur = () => {
        if (isEditing === false) {
            handleCancelEdit()
        }else {
            handleSaveTitle();
        }
    };

    return (
        <div ref={setNodeRef} style={dndKitColumnStyle}{...attributes}>
            <Box key={column.id} {...listeners}
                 className='w-[280px] h-fit bg-gray-100 p-4 pr-2 rounded-md drop-shadow-md text-left'>
                {/*<Heading className='flex items-center justify-between mb-4'>*/}
                {/*    <p className='text-lg cursor-pointer'>{column.title}</p>*/}
                {/*    <BsThreeDots className='text-2xl hover:bg-gray-200 p-1 rounded-md cursor-pointer'/>*/}
                {/*</Heading>*/}
                <Heading className='flex items-center justify-between mb-4'>
                    {isEditing ? (
                        <Input
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            autoFocus
                            onBlur={handleBlur}
                        />
                    ) : (
                        <p className='text-lg cursor-pointer' onClick={handleEditTitle}>{editedTitle}</p>
                    )}
                    <BsThreeDots className='text-2xl hover:bg-gray-200 p-1 rounded-md cursor-pointer'/>
                </Heading>
                <div className='max-h-[70vh] overflow-y-scroll' style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#888 #f1f1f1',
                    paddingRight: '2px'
                }}>
                    <ListCards cards={orderedCards}/>
                    {isCreateCard ? <CreateNewCardForm handleCreateCard={handleCreateCard} isCreateCard={isCreateCard}
                                                        column={column}
                                                        cards={orderedCards}/> : null}
                </div>

                <div onClick={handleCreateCard}>
                    {!isCreateCard &&
                        <div
                            className='flex items-center mt-4 font-medium text-gray-500 space-x-2 hover:text-black hover:bg-gray-200 w-full rounded-md p-1 -ml-1 cursor-pointer'
                            onClick={handleCreateCard}>
                            <IoMdAdd className='text-lg'/>
                            <p>Add a card</p>
                        </div>}
                </div>
            </Box>
        </div>
    );
};

export default Column;