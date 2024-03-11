import React, {useContext, useEffect, useState} from 'react';
import {Avatar} from "@chakra-ui/react";
import WorkspaceSidebarConfig from "./WorkspaceSidebarConfig";
import BoardContext from "../../Context/BoardContext";
import WorkspaceContext from "../../Context/WorkspaceContext";

const WorkspaceSidebar = () => {
    const { workspace, updateWorkspace } = useContext(WorkspaceContext);

    useEffect(() => {
        const storedWorkspace = localStorage.getItem('workspace');

        if (storedWorkspace) {
            updateWorkspace(JSON.parse(storedWorkspace));
        }
    }, []);
    return (
        <div className='flex flex-col items-start' >
            <div className="flex mt-4 ml-4">
                <Avatar size='sm' borderRadius='md' name={workspace.name} src=''/>
                <div className='ml-2 mt-1'>
                    <p className='text-base font-medium'>{workspace.name}</p>
                </div>
            </div>

            <hr className='border-1-slate-500 py-1 w-full mt-4'/>

            <div className='mt-4'>
                {WorkspaceSidebarConfig.map((item) => (
                    <div key={item.title} className='flex flex-row ml-2 my-3 text-lg space-x-4 cursor-pointer items-center font-medium hover:bg-gray-200 rounded-md p-2 w-64'>
                        {item.icon}
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>

            <hr className='border-1-slate-500 py-1 w-full'/>

            {/*<div className='ml-2 my-3'>*/}
            {/*    <p className='text-sm font-bold'>Workspaces</p>*/}
            {/*</div>*/}

            {/*<div className='mx-auto w-full hover:bg-gray-200 rounded-md p-2'>*/}
            {/*    <WorkspaceDropdown/>*/}
            {/*</div>*/}
        </div>
    );
};

export default WorkspaceSidebar;