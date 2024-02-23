import React from 'react';
import {BsTrello} from "react-icons/bs";
import {HiTemplate} from "react-icons/hi";
import {BiPulse} from "react-icons/bi";

const SidebarConfig = [
    {
        title: 'Boards', icon: <BsTrello />
    },
    {
        title: 'Templates', icon: <HiTemplate />
    },
    {
        title: 'Home', icon: <BiPulse />
    }
]

export default SidebarConfig;