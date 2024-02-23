import React, {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import ManagePage from "../Pages/ManagePage/ManagePage";
import Login from "../Pages/LoginPage/Login";
import CreateWorkspace from "../Components/WorkspaceModal/CreateWorkspace";
import InviteFriendWorkspace from "../Components/WorkspaceModal/InviteFriendWorkspace";

const Router = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    return (
        <div>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/' element={<CreateWorkspace/>}/>
                        <Route path='/manage-profile/*' element={<ManagePage/>}/>
                    </Routes>
                </BrowserRouter>

            </div>
        </div>
    );
};

export default Router;