import React from 'react';
import HomeHeader from "../../Components/HomeHeader/HomeHeader";
import Sidebar from "../../Components/SideBar/Sidebar";

const HomePage = () => {
    return (
        <div>
            <div className='border border-1-slate-500 py-1'>
                <HomeHeader/>
            </div>

            <div className='w-[20%] ml-20'>
                <Sidebar/>
            </div>
        </div>
    );
};

export default HomePage;