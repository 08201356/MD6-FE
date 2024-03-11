import React, {useState} from 'react';
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import Column from "./Column/Column";
import CreateColumnButton from "./NewColumn/CreateColumnButton";
import CreateNewColumnForm from "./NewColumn/CreateNewColumnForm";

const ListColumns = ({columns, setColumns }) => {
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
    const [cardOfColumn, setCardOfColumn] = useState([]);
    const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

    const handleCreateList = (title) => {

    };

    const updateColumn = (updatedColumn) => {
        setColumns(prevColumns => prevColumns.map(column =>
            (column.id === updatedColumn.id ? updatedColumn : column)
        ));
        console.log('New Columns:', columns);
    };


    return (
        <SortableContext items={columns?.map(c => c.id)} strategy={horizontalListSortingStrategy}>
            <div className='flex space-x-4'>
                {columns?.map((column) => (
                    <Column key={column.id} column={column} setColumn={updateColumn} />
                ))}
            </div>
            {!openNewColumnForm ? <CreateColumnButton toggle={toggleOpenNewColumnForm}/> :
                <CreateNewColumnForm columns={columns} setColumns={setColumns} toggle={toggleOpenNewColumnForm} onSubmit={handleCreateList}/>}
        </SortableContext>
    );
};

export default ListColumns;