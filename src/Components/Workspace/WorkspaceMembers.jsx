import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure} from "@chakra-ui/react";
import {FaLink} from "react-icons/fa";
import {AiOutlineUserAdd} from "react-icons/ai";
import {MdCheckCircleOutline} from "react-icons/md";
import axios from "axios";
import {IoIosClose} from "react-icons/io";
import InvitePopup from "../WorkspaceModal/InvitePopup";
import WorkspaceContext from "../../Context/WorkspaceContext";


const WorkspaceMembers = ({onOpen,onClose, members, setMembers}) => {
    const [showNotification, setShowNotification] = useState(true);
    const [selectedOption, setSelectedOption] = useState("workspaceMembers");
    const { workspace, updateWorkspace } = useContext(WorkspaceContext);

    useEffect(() => {
        const storedWorkspace = localStorage.getItem('workspace');

        if (storedWorkspace) {
            updateWorkspace(JSON.parse(storedWorkspace));
        }
    }, []);
    const handleClick = (option) => {
        setSelectedOption(option);
    };
    const hideNotification = (user, setUser) => {
        setShowNotification(true);
    };
    if (showNotification) {
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    }

    const handleRemoveMember = (memberId) => {
        axios.delete(`http://localhost:8080/api/test/members/${memberId}`).then(res => {
            setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));

        }).catch(error => {
            console.error('Error removing member:', error);
        });
    }
    const handleInvite = () => {
        onOpen()
    }

    return (
        <div className=''>
            <div className='flex mt-5'>
                <div className='w-[50%] flex place-content-center '>
                    <Avatar size='lg' borderRadius='md' name={workspace.name} src=''/>
                    <div className='ml-2 mt-3'>
                        <p className='font-medium text-xl'>{workspace.name}</p>
                    </div>
                </div>

                <div className='w-[50%] mt-2 self-center'>
                    <Button colorScheme='blue' onClick={handleInvite}><AiOutlineUserAdd/>Invite Workspace members</Button>
                </div>
            </div>

            <hr className='border-1-slate-500 py-1 w-full mt-4'/>

            <div className='flex mt-10'>
                <div className='w-[25%] flex flex-col items-start'>
                    <h1 className='text-xl font-semibold'>Members</h1>
                    <p className='text-sm mt-5'>Members of Workspace boards</p>

                    <div
                        className={`hover:bg-gray-200 w-48 h-9 py-3 pr-4 rounded-md ${selectedOption === "workspaceMembers" ? 'bg-blue-100' : ''}`}
                        onClick={() => handleClick("workspaceMembers")}>
                        <button
                            className={`font-semibold flex justify-center ${selectedOption === "workspaceMembers" ? "text-blue-700" : ""}`}>Workspace
                            members
                        </button>
                    </div>

                    <div
                        className={`hover:bg-gray-200 w-48 h-9 py-3 pr-4 rounded-md ${selectedOption === "guests" ? 'bg-blue-100' : ''}`}
                        onClick={() => handleClick("guests")}>
                        <button
                            className={`font-semibold flex justify-center ${selectedOption === "guests" ? "text-blue-700" : ""}`}>Guests
                        </button>
                    </div>

                    <div
                        className={`hover:bg-gray-200 w-48 h-9 py-3 pr-4 rounded-md ${selectedOption === "pending" ? 'bg-blue-100' : ''}`}
                        onClick={() => handleClick("pending")}>
                        <button
                            className={`font-semibold flex justify-center ${selectedOption === "pending" ? "text-blue-700" : ""}`}>Pending
                        </button>
                    </div>

                </div>

                <div className='w-[75%] relative'>
                    <div className='flex flex-col items-start'>
                        <p className='text-xl font-semibold'>Workspace members</p>
                        <p className='text-left text-lg mt-3'>Workspace members can view and join all Workspace visible
                            boards and create new boards in the Workspace.</p>
                    </div>

                    <hr className='border-1-slate-500 py-1 w-full mt-4'/>

                    <div className='flex justify-between'>
                        <div className='w-[60%] flex flex-col items-start '>
                            <p className='text-xl font-semibold mt-5'>Invite members to join you</p>
                            <p className='text-left text-lg mt-3'>Anyone with an invite link can join this Free
                                Workspace. You can also disable and create a new invite link for this Workspace at any
                                time.</p>
                        </div>

                        <div className='place-self-end space-y-12'>
                            {showNotification &&
                                <div className="absolute flex bg-emerald-200 rounded-md">
                                    <MdCheckCircleOutline className="mt-0.5 text-emerald-600"/>
                                    <p className="text-sm text-emerald-600">Link copied to clipboard</p>
                                </div>}
                            <div className='flex items-center hover:bg-gray-300'>
                                <FaLink/>
                                <button className='ml-1' onClick={hideNotification}>Invite with link</button>
                            </div>
                        </div>
                    </div>

                    <hr className='border-1-slate-500 py-1 w-full mt-4'/>

                    <div className='flex justify-start mt-5'>
                        <form className="">
                            <input
                                type="text"
                                placeholder="Fillter by name"
                                className="w-48 h-9 py-3 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-blue-400 focus:border-2"
                            />
                        </form>
                    </div>

                    <hr className='border-1-slate-500 py-1 w-full mt-4'/>
                    {/*{members.map((users, index) => (*/}
                    {/*    <div key={index} className='mt-2'>*/}
                    {/*        <div className='flex justify-between items-center'>*/}
                    {/*            <div className='flex'>*/}
                    {/*                <Avatar className='mt-1' size='sm' src={users.user.avatarUrl}*/}
                    {/*                        name={users.user.username}/>*/}
                    {/*                <div className='ml-2'>*/}
                    {/*                    <p className='text-base font-medium'>{users.user.username}</p>*/}
                    {/*                    <p className='text-sm'>{users.user.email}</p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}

                    {/*            <div className='flex space-x-6 items-center'>*/}
                    {/*                <div>*/}
                    {/*                    <p className='mt-1'>On 0 boards</p>*/}
                    {/*                </div>*/}

                    {/*                <div>*/}
                    {/*                    <Button variant='outline'>{users.role}</Button>*/}
                    {/*                </div>*/}

                    {/*                <div>*/}
                    {/*                    <Menu>*/}
                    {/*                        {users.role === 'ROLE_ADMIN' ? (*/}
                    {/*                            <MenuButton*/}
                    {/*                                px={5}*/}
                    {/*                                py={2}*/}
                    {/*                                transition='all 0.2s'*/}
                    {/*                                borderRadius='md'*/}
                    {/*                                borderWidth='1px'*/}
                    {/*                                _hover={{bg: 'gray.400'}}*/}
                    {/*                                _expanded={{bg: 'gray.400'}}*/}
                    {/*                                _focus={{boxShadow: 'outline'}}*/}
                    {/*                            >*/}
                    {/*                                <div className='flex'>*/}
                    {/*                                    <IoIosClose className='mt-1'/>Leave*/}
                    {/*                                </div>*/}
                    {/*                            </MenuButton>*/}
                    {/*                        ) : (*/}
                    {/*                            <MenuButton*/}
                    {/*                                px={4}*/}
                    {/*                                py={2}*/}
                    {/*                                transition='all 0.2s'*/}
                    {/*                                borderRadius='md'*/}
                    {/*                                borderWidth='1px'*/}
                    {/*                                _hover={{bg: 'gray.400'}}*/}
                    {/*                                _expanded={{bg: 'gray.400'}}*/}
                    {/*                                _focus={{boxShadow: 'outline'}}*/}
                    {/*                            >*/}
                    {/*                                <div className='flex'>*/}
                    {/*                                    <IoIosClose className='mt-1'/>Remove*/}
                    {/*                                </div>*/}
                    {/*                            </MenuButton>*/}
                    {/*                        )}*/}
                    {/*                        <MenuList>*/}
                    {/*                            <MenuItem onClick={() => handleRemoveMember(users.id)}>*/}
                    {/*                                <div className="">*/}
                    {/*                                    <p>Remove from Workspace</p>*/}
                    {/*                                    <p className='text-sm'>Remove all access to the Workspace</p>*/}
                    {/*                                </div>*/}
                    {/*                            </MenuItem>*/}

                    {/*                            <MenuItem>*/}
                    {/*                                <div className="">*/}
                    {/*                                    <p>Deactivate</p>*/}
                    {/*                                    <p className='text-sm'>Disable member's access to Workspace boards,*/}
                    {/*                                        but <br/> allow other Workspace members to see what*/}
                    {/*                                        cards <br/> and boards the member was on.</p>*/}
                    {/*                                </div>*/}
                    {/*                            </MenuItem>*/}
                    {/*                        </MenuList>*/}
                    {/*                    </Menu>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*    </div>*/}
                    {/*))}*/}
                    <hr className='border-1-slate-500 py-1 w-full mt-4'/>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceMembers;