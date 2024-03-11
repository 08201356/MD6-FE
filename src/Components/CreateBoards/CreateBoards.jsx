import React, {useEffect, useState} from 'react';
import {
    Button,
    Select, useToast
} from "@chakra-ui/react";
import {IoChevronBack} from "react-icons/io5";
import {IoMdClose} from "react-icons/io";
import {PiHandWaving} from "react-icons/pi";
import axios from "axios";
import workspace from "../../Pages/WorkspacePage/Workspace";

const CreateBoards = ({user, workspace}) => {
    const [boardTitle, setBoardTitle] = useState("")
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState('');
    const isButtonDisabled = !boardTitle;
    const toast = useToast();
    const [boardVisibility, setBoardVisibility] = useState([]);
    const [selectedVisibility, setSelectedVisibility] = useState('');

    console.log(selectedVisibility)

    const handleCreateBoard = () => {
        axios.post('http://localhost:8080/api/boards/create',{
            email: user.email,
            title: boardTitle,
            workspaceId: selectedWorkspaceId,
            visibility: [selectedVisibility],
        }).then(res => {
            toast({
                title: 'Create Board Successful',
                description: 'You have successfully created a new board.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
            .catch(error => {
                console.error("Error creating workspace:", error);
            });
    }

    useEffect(() => {
        if (workspace.length > 0) {
            setSelectedWorkspaceId(workspace[0].id);
        }
    }, [workspace]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/boards/visibility")
            .then(response => {
               setBoardVisibility(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching board visibility:", error);
            });
    }, []);


    return (
        // <Menu>
        //     <MenuList minWidth='340px'>
        <div className="flex flex-col items-center justify-center">
            <div className='flex w-full justify-between'>
                <button className=''><IoChevronBack/></button>
                <p className='font-semibold'>Create board</p>
                <button className=''><IoMdClose/></button>
            </div>

            <div className="w-[90%]">
                <p className='flex font-semibold'>Board title<span className="text-red-500">*</span></p>
                <input value={boardTitle}
                       onChange={(e) => setBoardTitle(e.target.value)}
                       className='w-full pl-2 h-9 border-2 border-blue-400 outline-none focus:border-blue-400 hover:border-red-500 rounded-md'/>
                {boardTitle ?
                    null : <div className="flex">
                        <PiHandWaving className='w-6 h-6 text-yellow-500'/>
                        <p className='h-6'>Board title is required</p>
                    </div>
                }
            </div>

            <div className='w-[90%] '>
                <p className='flex font-semibold'>Workspace</p>
                <Select placeholder=''
                        onChange={(e) => setSelectedWorkspaceId(e.target.value)}
                        value={selectedWorkspaceId}
                >
                    {workspace.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </Select>
            </div>

            <div className="w-[90%]">
                <p className='flex font-semibold'>Visibility</p>
                <Select
                    value={selectedVisibility}
                    onChange={(e) => setSelectedVisibility(e.target.value)}
                >
                    {boardVisibility.map((type) => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                    ) )}

                </Select>
            </div>

            <div className="w-[90%] mt-3">
                <Button className="w-full" isDisabled={isButtonDisabled} colorScheme='blue' onClick={handleCreateBoard}>
                    Create
                </Button>
            </div>

            <div className="w-[90%] h-9 mt-3 border-2 rounded-md border-gray-100 hover:bg-gray-200">
                <button className="w-full">Start with a template</button>
            </div>
            <div className='flex w-[90%] text-sm text-left mt-2'>
                <p>By using images from Unsplash, you agree to their <a href="https://unsplash.com/license"
                                                                        target="_blank" rel="noopener noreferrer"
                                                                        className="hover:underline">license </a> and <a
                    href="https://unsplash.com/terms" target="_blank" rel="noopener noreferrer"
                    className="hover:underline"> Terms of Service</a></p>
            </div>
        </div>
        //     </MenuList>
        // </Menu>
    )
};

export default CreateBoards;