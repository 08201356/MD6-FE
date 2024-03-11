import React, {useEffect, useState} from 'react';
import {
    Avatar, AvatarGroup,
    Button, Checkbox, Input, Menu, MenuButton, MenuItem, MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Textarea, Tooltip, useDisclosure
} from "@chakra-ui/react";
import { PiChalkboardSimple } from "react-icons/pi";
import { HiMenuAlt2 } from "react-icons/hi";
import { RxActivityLog } from "react-icons/rx";
import { MdPersonOutline } from "react-icons/md";
import { TiTag } from "react-icons/ti";
import axios from "axios";
import {useParams} from "react-router-dom";
import CardService from "../Service/CardService";
const CardModal = ({onOpen,onClose,isOpen,toggleVisibility,card,showMembers}) => {
    const [inputValue, setInputValue] = useState('');
    const [originalValue, setOriginalValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [members, setMembers] = useState([]);
    const {id} = useParams();
    const [user, setUser] = useState({});
    const [greenCheckbox, setGreenCheckbox] = useState(false);
    const [yellowCheckbox, setYellowCheckbox] = useState(false);
    const [orangeCheckbox, setOrangeCheckbox] = useState(false);
    const [redCheckbox, setRedCheckbox] = useState(false);
    const [purpleCheckbox, setPurpleCheckbox] = useState(false);
    const [blueCheckbox, setBlueCheckbox] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/boards/${id}/members`)
            .then(response => {
                setMembers(response.data);
            }) .catch(error => {
            console.error('Error fetching members:', error);

        });
    }, []);

    const handleEditClick = () => {
        setOriginalValue(inputValue);
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setOriginalValue(inputValue);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setInputValue(originalValue);
        setIsEditing(false);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCheckboxChange = (color) => {
        switch (color) {
            case 'green':
                setGreenCheckbox(!greenCheckbox);
                break;
            case 'yellow':
                setYellowCheckbox(!yellowCheckbox);
                break;
            case 'orange':
                setOrangeCheckbox(!orangeCheckbox);
                break;
            case 'red':
                setRedCheckbox(!redCheckbox);
                break;
            case 'purple':
                setPurpleCheckbox(!purpleCheckbox);
                break;
            case 'blue':
                setBlueCheckbox(!blueCheckbox);
                break;
            default:
                break;
        }
        toggleVisibility(color);
    };

    const [isEditingg, setIsEditingg] = useState(false);
    const [editedTitle, setEditedTitle] = useState(card.title);
    const handleEdit = () => {
        setIsEditingg(true);
    };

    const handleSave = () => {
        setIsEditingg(false);
        CardService.changeCardTitle(card.id,editedTitle)
    };

    const handleCancel = () => {
        setEditedTitle(card.title);
        setIsEditingg(false);
    };

    const handleBlur = () => {
        if (isEditingg === false) {
            handleCancel()
        }else {
            handleSave();
        }
    };

    const handleMemberClick = (data) => {
        CardService.addMemberToCard(card.id,data)
        console.log(card.id)
    }
    return (
        <div>
            <Modal size={'3xl'} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <div className='flex h-10'>
                            <PiChalkboardSimple className='mt-1'/>
                            {isEditingg ? (
                                <div className='flex flex-row justify-between items-center'>
                                    <Input
                                        value={editedTitle}
                                        onChange={e => setEditedTitle(e.target.value)}
                                        onBlur={handleBlur}
                                        autoFocus
                                    />
                                </div>
                            ) : (
                            <p className='text-lg font-medium ml-2' onClick={handleEdit}>{editedTitle}</p>
                            )}
                        </div>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <div className="flex justify-between">
                            <div className="w-[70%]">
                                <div className='flex flex-col '>
                                    <p className='text-sm'>members</p>
                                    <AvatarGroup className='mt-3' size='xs' max={2}>
                                        {showMembers.map((member) => (
                                            <Tooltip key={member.id} label={member.username}>
                                                <Avatar key={member.id} name={member.name} src={member.avatarUrl} boxSize='40px'/>
                                            </Tooltip>
                                        ))}
                                    </AvatarGroup>
                                </div>

                                <div className="flex mt-5">
                                    <HiMenuAlt2 className='mt-1'/>
                                    <p className='font-bold ml-1 mb-5'>Description</p>
                                </div>
                                {isEditing ? (
                                    <Textarea
                                        rows={10}
                                        value={inputValue}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <div onClick={handleEditClick}>
                                        {inputValue ? (
                                            <p className='ml-5'>{inputValue}</p>
                                        ) : (
                                            <Textarea
                                                rows={3}
                                                value={inputValue}
                                                onChange={handleChange}
                                            />
                                        )}
                                    </div>
                                )}
                                {isEditing && (
                                    <div className='mt-2'>
                                        <Button colorScheme='blue' onClick={handleSaveClick}>Save</Button>
                                        <Button onClick={handleCancelClick}>Cancel</Button>
                                    </div>
                                )}
                                <div className="flex mt-10">
                                    <RxActivityLog className='mt-1'/>
                                    <p className='font-bold ml-2'>Activity</p>
                                </div>
                            </div>



                            <div className='flex flex-col space-y-2 w-[20%]'>
                                <p>Add to card</p>

                                <Menu>
                                    <MenuButton borderRadius='md'
                                                bg='gray.200'
                                                _expanded={{ bg: 'gray.200' }}
                                                _hover={{ bg: 'gray.300' }}>
                                        <div className='flex'>
                                            <MdPersonOutline className='mt-1 mr-1'/>
                                            <p className='font-semibold'>Members</p>
                                        </div>
                                    </MenuButton>
                                    <MenuList>
                                        <div className='flex flex-col items-center space-y-3'>
                                            <div>
                                                <p className='font-semibold'>Members</p>
                                            </div>
                                           <div className='w-[90%]' >
                                               <Input placeholder='Search members'></Input>
                                           </div>
                                           <div className=' w-[90%] '>
                                               <p>Board members</p>
                                           </div>
                                            <MenuItem minH='40px' onClick={() => handleMemberClick(user.username)}>
                                                <Avatar
                                                    boxSize='2rem'
                                                    borderRadius='full'
                                                    src={user.avatarUrl}
                                                    alt={user.username}
                                                    mr='12px'
                                                />
                                                <span>{user.username}</span>
                                            </MenuItem>
                                            {members.map(member => (
                                            <MenuItem key={member.id} minH='48px' onClick={() => handleMemberClick(member.username)}>
                                                <Avatar
                                                    boxSize='2rem'
                                                    borderRadius='full'
                                                    src={member.avatarUrl}
                                                    alt={member.username}
                                                    mr='12px'
                                                />
                                                <span>{member.username}</span>
                                            </MenuItem>
                                            ))}

                                        </div>

                                    </MenuList>
                                </Menu>

                                <Menu closeOnSelect={false}>
                                    <MenuButton borderRadius='md'
                                                bg='gray.200'
                                                _expanded={{ bg: 'gray.200' }}
                                                _hover={{ bg: 'gray.300' }}>
                                        <div className='flex'>
                                            <TiTag  className='mt-1 mr-1'/>
                                            <p className='font-semibold'>Labels</p>
                                        </div>
                                    </MenuButton>
                                    <MenuList>
                                        <div className='flex flex-col items-center space-y-3'>
                                            <div>
                                                <p className='font-semibold'>Labels</p>
                                            </div>
                                            <div className='w-[90%]' >
                                                <Input placeholder='Search label...'></Input>
                                            </div>
                                            <div className=' w-[90%] '>
                                                <p>Labels</p>
                                            </div>

                                            <MenuItem minH='40px'>
                                                <Checkbox onChange={() => handleCheckboxChange('green')} isChecked={greenCheckbox}></Checkbox>
                                                <div className='w-[90%] h-6 bg-green-500 ml-2'></div>
                                            </MenuItem>


                                            <MenuItem minH='48px'>
                                                <Checkbox onChange={() => handleCheckboxChange('yellow')} isChecked={yellowCheckbox}></Checkbox>
                                                <div className='w-[90%] h-6 bg-yellow-500 ml-2'></div>
                                            </MenuItem>

                                            <MenuItem minH='48px'>
                                                <Checkbox onChange={() => handleCheckboxChange('orange')} isChecked={orangeCheckbox}></Checkbox>
                                                <div className='w-[90%] h-6 bg-orange-500 ml-2'></div>
                                            </MenuItem>

                                            <MenuItem minH='48px'>
                                                <Checkbox onChange={() => handleCheckboxChange('red')} isChecked={redCheckbox}></Checkbox>
                                                <div className='w-[90%] h-6 bg-red-500 ml-2'></div>
                                            </MenuItem>

                                            <MenuItem minH='48px'>
                                                <Checkbox onChange={() => handleCheckboxChange('purple')} isChecked={purpleCheckbox}></Checkbox>
                                                <div className='w-[90%] h-6 bg-purple-500 ml-2'></div>
                                            </MenuItem>

                                            <MenuItem minH='48px'>
                                                <Checkbox onChange={() => handleCheckboxChange('blue')} isChecked={blueCheckbox}></Checkbox>
                                                <div className='w-[90%] h-6 bg-blue-500 ml-2'></div>
                                            </MenuItem>

                                        </div>
                                    </MenuList>
                                </Menu>

                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CardModal;