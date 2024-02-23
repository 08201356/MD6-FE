import React, {useState} from 'react';
import {IoAppsSharp} from "react-icons/io5";
import {FaQuestionCircle} from "react-icons/fa";
import {
    Avatar,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Tab, TabIndicator, TabList, Tabs
} from "@chakra-ui/react";
import ManageTabConfig from "./ManageTabConfig";
import {FaUserGroup} from "react-icons/fa6";
import {FiLogOut} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";

const ManageHeader = () => {
    const [activeTab, setActiveTab] = useState('');
    const navigate = useNavigate();

    const HandleTabClick = (title) => {
        setActiveTab(title)
        if (title === "Profile and visibility") {
            navigate("./profile-and-visibility");
        } else if (title === "Email") {
            navigate("./email");
        } else if (title === "Security") {
            navigate("./security")
        }
    }

    return (
        <div className='bg-white border-gray-200  w-full lg:px-6 py-1'>
            <div className='flex flex-row items-center justify-between mx-auto max-w-screen relative'>
                <div className='flex items-center space-x-2'>
                    <div>
                        <IoAppsSharp className='text-4xl cursor-pointer hover:bg-gray-200 rounded-md p-2'/>
                    </div>

                    <Link className='w-[12%] cursor-pointer hover:bg-gray-200 rounded-md p-2' to='/'>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/1280px-Trello_logo.svg.png"
                            alt=""/>
                    </Link>

                    <div className='flex space-x-3'>
                        <Tabs variant='unstyled'>
                            <TabList>
                                {ManageTabConfig.map((item) => (
                                    <Tab _selected={{
                                        color: "blue",
                                    }} onClick={() => HandleTabClick(item.title)}
                                         className='flex text-base font-semibold cursor-pointer'>
                                        <div>
                                            {item.title}
                                        </div>
                                    </Tab>
                                ))}
                            </TabList>

                            <TabIndicator
                                mt="15px"
                                height="3px"
                                bg="blue"
                                borderRadius="1px"
                            />
                        </Tabs>
                    </div>
                </div>

                <div className='flex items-center space-x-2'>
                    <div>
                        <FaQuestionCircle className='text-3xl cursor-pointer hover:bg-gray-200 rounded-full p-1'/>
                    </div>


                    <div>
                        <Menu>
                            <MenuButton
                                px={1}
                                py={1}
                                transition='all 0.2s'
                                borderRadius='full'
                                _hover={{bg: 'gray.200'}}
                            >
                                <Avatar size='sm' name='Username' src=''/>
                            </MenuButton>

                            <MenuList className='my-1.5'>
                                <MenuItem background={'ghostwhite'}>
                                    <Avatar size='lg' name='Username' src=''/>
                                    <div className='ml-2'>
                                        <p className='text-lg font-bold'>Username</p>
                                        <p className='text-base font-medium'>username@gmail.com</p>
                                    </div>
                                </MenuItem>

                                <div>
                                    <MenuItem>
                                        <FaUserGroup className='text-base'/>
                                        <span className='ml-2 text-base font-medium'>Switch accounts</span>
                                    </MenuItem>

                                    <MenuItem>
                                        <FiLogOut className='text-base'/>
                                        <span className='ml-2 text-base font-medium'>Log out</span>
                                    </MenuItem>
                                </div>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageHeader;