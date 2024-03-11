import React, {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {imageDb} from "../../FirebaseImageUpload/Config";


const AttachFileMenu = ({user, setUser}) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const uploadFile = () => {
        const fileInput = document.getElementById('fileInput');
        const files = fileInput.files;

        if (files.length > 0) {
            // Lưu tất cả các Promise của việc upload vào mảng promises
            const uploadPromises = Array.from(files).map((file) => {
                const storageRef = ref(imageDb, `uploads/${file.name}`);
                return uploadBytes(storageRef, file);
            });

            // Sau khi tất cả các file được upload, lấy đường dẫn và hiển thị thông tin
            Promise.all(uploadPromises).then(() => {
                const filesInfoPromises = Array.from(files).map((file) => {
                    const storageRef = ref(imageDb, `uploads/${file.name}`);
                    return getDownloadURL(storageRef).then((downloadURL) => {
                        return {
                            downloadURL,
                            fileName: file.name,
                            thumbnail:
                                file.type.startsWith('image/')
                                    ? URL.createObjectURL(file)
                                    : 'https://firebasestorage.googleapis.com/v0/b/trelloimageupload.appspot.com/o/uploads%2Fpngwing.com.png?alt=media&token=122f8783-5c85-4cfa-91c8-8e3c0a582cf3',
                        };
                    });
                });

                // Hiển thị thông tin của các file đã upload
                Promise.all(filesInfoPromises).then((filesInfo) => {
                    setUploadedFiles((prevFiles) => prevFiles.concat(filesInfo));
                });
            });
        } else {
            alert('Please select a file.');
        }
    };


    return (
        <div>
            <h1>File Upload with Firebase</h1>
            <input type="file" id="fileInput" multiple/>
            <button onClick={uploadFile}>Upload File</button>

            {/* Hiển thị thông tin của các đường dẫn đã upload */}
            {uploadedFiles.map((file, index) => (

                <div key={index}
                    className='cursor-pointer rounded-sm max-w-[40%] border border-black hover:bg-gray-200 mt-4'>
                    <a href={file.downloadURL}
                       target="_blank"
                       className='hover:bg-black'
                    >
                        <div className='flex items-center space-x-4'>
                            <div>
                                <img
                                    src={file.thumbnail}
                                    alt="Thumbnail"
                                    width="100"
                                />
                            </div>

                            <div className='text-md text-left font-bold max-w-full'>
                                <p>{file.fileName}</p>
                            </div>

                        </div>
                    </a>
                </div>
            ))}
        </div>
    )
}

export default AttachFileMenu;