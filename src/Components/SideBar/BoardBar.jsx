import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button, Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select,
    Tooltip,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {CiLock, CiStar} from "react-icons/ci";
import {FaStar} from "react-icons/fa";
import {BiGroup} from "react-icons/bi";
import {MdOutlinePublic} from "react-icons/md";
import {AiOutlineUserAdd} from "react-icons/ai";
import axios from "axios";
import {useParams} from "react-router-dom";
import BoardContext from "../../Context/BoardContext";

const BoardBar = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isClicked, setIsClicked] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [suggestedEmails, setSuggestedEmails] = useState([]);
    const [user, setUser] = useState({});
    const toast = useToast();
    const { id } = useParams();

    const {board, updateBoard} = useContext(BoardContext);

    useEffect(() => {
        const storedBoard = localStorage.getItem('board');

        if (storedBoard) {
            updateBoard(JSON.parse(storedBoard));
        }
    }, []);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    }, []);

    const [members, setMembers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/boards/${id}/members`)
            .then(response => {
                setMembers(response.data);
            }) .catch(error => {
                console.error('Error fetching members:', error);

        });
    }, []);

    const handleInputChange = (e) => {
        const query = e.target.value;
        axios.get(`http://localhost:8080/api/users/suggest/${query}`)
            .then(response => {
                setSuggestedEmails(response.data);
            })
            .catch(error => {
                console.error("Error fetching suggested emails:", error);
            });
        setUserEmail(query);
    };



    const handleEmailClick = (email) => {
        setUserEmail(email);
    };

    const handleShareButtonClick = () => {
        axios.post(`http://localhost:8080/api/boards/${id}/addUser/${userEmail}`)
            .then(response => {
                console.log('User added successfully:', response.data);
                toast({
                    title: "User added successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setUserEmail("");
                setSelectedRole("");
            })
            .catch(error => {
                console.error('Error adding user:', error);
                toast({
                    title: "Error adding user",
                    description: "An error occurred while adding the user. Please try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };
    const handleShareClose = () => {
        setUserEmail("");
        setSelectedRole("");
        onClose();
    };
    return (
        <Box sx={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            borderTop: '1px solid #d1d5db',
        }}>
            <Box sx={{display: 'flex',
                alignItems: 'center',
                gap: 2 ,
                padding: 2,
                borderRadius: 'md',
                backgroundColor: 'gray.100'}}>
                <p className='font-bold'>{board.title}</p>
                <div className='hover:bg-gray-200 ' onClick={handleClick} style={{ padding: '10px', borderRadius: '5px' }}>
                    {isClicked ? <FaStar /> : <CiStar />}
                </div>
                <Menu>
                        <MenuButton px={2}
                                    py={2}
                                    borderRadius='2'
                                    _hover={{bg: 'gray.200'}}
                                    rounded='md'
                        ><p className='flex'><BiGroup className='mt-1 mr-1'/>Workspace visible</p>
                        </MenuButton>
                    <MenuList className='w-full'>
                        <MenuItem>
                            <div>
                                <p className='flex'><span className="text-red-500"><CiLock className='mt-1 mr-1'/></span>Private</p>
                                <p className='text-sm text-left'>Only board members can see and edit this board.</p>
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div>
                                <p className='flex'><BiGroup className='mt-1 mr-1'/>Workspace</p>
                                <p className='text-sm text-left'>All members of the name.board Workspace can see and edit this board.</p>
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div>
                                <p className='flex'><span className="text-green-500"><MdOutlinePublic className='mt-1 mr-1'/></span>Public</p>
                                <p className='text-sm text-left'>Anyone on the internet can see this board. Only board members can edit.</p>
                            </div>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>

            <Box sx={{display: 'flex',
                alignItems: 'center',
                gap: 2 ,
                padding: 2,
                borderRadius: 'md',
                backgroundColor: 'gray.100'}}>
                <AvatarGroup size='sm' max={5}>
                    <Tooltip label={user.username}>
                        <Avatar name={user.username} src={user.avatarUrl} boxSize='34px' />
                    </Tooltip>
                    {members.map(member => (
                        <Tooltip key={member.id} label={member.username}>
                            <Avatar name={member.username} src={member.avatarUrl} boxSize='34px' />
                        </Tooltip>
                    ))}
                </AvatarGroup>
                <Button onClick={onOpen} colorScheme='teal' variant='solid'><AiOutlineUserAdd className= 'mr-1'/>Share</Button>
                <Modal size={"xl"} isOpen={isOpen} onClose={handleShareClose} isCentered>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Share board</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <div className='flex'>
                                <Input value={userEmail} onChange={handleInputChange}
                                    placeholder='Email address or name' className='mr-1'/>
                                <div className='w-44 mr-1'>
                                    <Select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}
                                        placeholder='Member'>
                                        <option value="Obsever">Obsever</option>
                                    </Select>
                                </div>

                                <Button onClick={handleShareButtonClick} colorScheme='blue'>Share</Button>
                            </div>
                            {suggestedEmails.map((user, index) => (
                                <div
                                    key={index}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleEmailClick(user.email)}
                                >
                                    {user.email}
                                </div>
                            ))}
                            {members.map(member => (
                            <div className='mt-2'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex'>
                                        <Avatar className='mt-1' size='sm' name={member.username} src={member.avatarUrl}/>
                                        <div className='ml-2'>
                                            <p className='text-base font-medium'>{member.username}</p>
                                            <p className='text-sm'>{member.email}</p>
                                        </div>
                                    </div>

                                    <div className='flex space-x-6 items-center'>
                                        <div>
                                            <Select placeholder='Admin' className=''>
                                                <option value="">Obsever</option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                ))}
                        </ModalBody>

                        <ModalFooter>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

        </Box>
    );
};

export default BoardBar;