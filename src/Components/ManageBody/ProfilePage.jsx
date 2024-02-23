import React from 'react';
import {Avatar} from "@chakra-ui/react";
import {IoIosCamera, IoIosInformationCircle} from "react-icons/io";
import {IoEarth} from "react-icons/io5";
import {MdInsertPhoto} from "react-icons/md";

const ProfilePage = () => {
    return (
        <div>
            <div className='mt-10'>
                <h1 className='text-2xl font-bold'>Profile and visibility</h1>
            </div>

            <div className='mt-5'>
                <text className='text-sm font-medium'>
                    Manage your personal information, and control which information other people see and apps may
                    access.
                    <br/>
                    Learn more about your profile and visibility or view our privacy policy.
                </text>
            </div>

            <div className='mt-5'>
                <div>
                    <h2 className='text-lg font-semibold'>Profile photo and header image</h2>
                </div>

                <div className='mt-4 border border-gray-200 rounded-md relative'>
                    <div className='relative text-white cursor-pointer'>
                        <div className='bg-gradient-to-r from-cyan-400 to-cyan-200 h-28 rounded-t-md border-b-gray-200'></div>

                        {/* Overlay */}
                        <div
                            className='absolute flex items-center justify-center inset-0 bg-black rounded-t-md opacity-0 hover:bg-opacity-30 hover:opacity-100 transition-opacity duration-300'>
                            <div className='flex flex-col items-center justify-center'>
                                <MdInsertPhoto className='text-4xl'/>
                                <p className='text-base font-medium text-white'>Update your header image</p>
                            </div>
                        </div>
                    </div>


                    <div className='absolute flex flex-col items-center inset-x-10 my-auto top-10 rounded-full border border-white w-fit'>
                        <div>
                            <Avatar className='border-2 border-white' name='Username' size='xl'/>
                        </div>

                        <div
                            className='absolute flex items-center justify-center inset-0 bg-black rounded-full opacity-0 hover:bg-opacity-50 hover:opacity-100 transition-opacity duration-300'>
                                <IoIosCamera className='text-4xl' color='white'/>
                        </div>
                    </div>

                    <div className='h-28 rounded-b-md border-2-gray-200 flex justify-end text-right items-center'>
                        <div className='space-y-5'>
                            <div className='flex space-x-1 mr-2'>
                                <p className='text-xs '>Who can see your profile photo?</p>
                                <IoIosInformationCircle/>
                            </div>

                            <div className='flex items-center font-medium space-x-1 mr-2 opacity-70'>
                                <IoEarth/>
                                <p>Anyone</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
};

export default ProfilePage;