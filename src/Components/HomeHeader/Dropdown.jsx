import React from 'react';
import {IoChevronDownSharp} from "react-icons/io5";

const Dropdown = ({title}) => {
    return (
        <div className='flex items-center font-medium py-2 px-3 cursor-pointer hover:bg-gray-200 rounded-md'>
                {title}
                <IoChevronDownSharp className='mt-1 ml-1'/>
        </div>
    );
};

export default Dropdown;