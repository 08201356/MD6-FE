import React from 'react';
import SidebarConfig from "./SidebarConfig";
import WorkspaceDropdown from "./WorkspaceDropdown";
import {Avatar} from "@chakra-ui/react";

const Sidebar = () => {
    return (
        <div className='flex flex-col items-start'>
            <div className='mt-4'>
                {SidebarConfig.map((item) => (
                    <div className='flex flex-row ml-2 my-3 text-lg space-x-4 cursor-pointer items-center font-medium hover:bg-gray-200 rounded-md p-2 w-64'>
                        {item.icon}
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>

            <hr className='border-t-1 border-black my-2 mx-auto w-full'/>

            <div className='ml-2 my-3'>
                <p className='text-sm font-bold'>Workspaces</p>
            </div>

            <div className='mx-auto w-full hover:bg-gray-200 rounded-md p-2'>
                <WorkspaceDropdown/>
            </div>
        </div>
    );
};

export default Sidebar;