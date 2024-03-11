import React, {useContext, useEffect, useState} from 'react';
import HomeHeader from "../../Components/HomeHeader/HomeHeader";
import Sidebar from "../../Components/SideBar/Sidebar";
import {useDisclosure} from "@chakra-ui/react";
import CreateWorkspaceModal from "../../Components/WorkspaceModal/CreateWorkspaceModal";
import BoardsPage from "../../Components/HomePageBody/BoardsPage";
import {Route, Routes} from "react-router-dom";
import HomeNotification from "../../Components/HomePageBody/HomeNotification";
import UserContext from "../../Context/UserContext";
import UserService from "../../Service/UserService";

const HomePage = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [workspaceName, setWorkspaceName] = useState("");
    const [workspaceType, setWorkspaceType] = useState("");
    const [workspaceDescription, setWorkspaceDescription] = useState("");
    const [workspaceList, setWorkspaceList] = useState([]);
    const {user, updateUser} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const newUser = JSON.parse(localStorage.getItem('userLogin'));
        UserService.getUserById(newUser.id).then((data) => {
            updateUser(data)
        })
        UserService.getWorkspaceByUser(newUser.id).then((data) => {
            setWorkspaceList(data)
            setLoading(false);
        })

    }, []);
    if (loading) {
        return null;
    }

    return (
        <div>
            <div className='border border-1-slate-500 py-1'>
                <HomeHeader onOpen={onOpen} onClose={onClose} workspace={workspaceList}/>
            </div>

            <div className='flex'>
                <div className='w-[20%] ml-20 h-fit mt-4'>
                    <Sidebar workspace={workspaceList}/>
                </div>

                <div className='ml-10 w-full mt-4 overflow-visible'>
                    <Routes>
                        <Route path='/boards' element={<BoardsPage workspaceList={workspaceList} user={user}/>}></Route>
                        <Route path='/' element={<HomeNotification workspace={workspaceList} user={user}/>}></Route>
                    </Routes>
                </div>
            </div>

            <CreateWorkspaceModal onOpen={onOpen} isOpen={isOpen} onClose={onClose}
                                  workspaceName={workspaceName} setWorkspaceName={setWorkspaceName}
                                  workspaceType={workspaceType} setWorkspaceType={setWorkspaceType}
                                  workspaceDescription={workspaceDescription}
                                  setWorkspaceDescription={setWorkspaceDescription}
            />
        </div>
    );
};

export default HomePage;