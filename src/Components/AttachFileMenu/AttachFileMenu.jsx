import React, {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {imageDb} from "../../FirebaseImageUpload/Config";
import CardService from "../../Service/CardService";
import {useSocket} from "../../Socket/WebSocketComponent";


const AttachFileMenu = ({user, setUser}) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [cardId, setCardId] = useState(1);

    useEffect(() => {
        // Gọi phương thức GET để lấy các đường dẫn từ cardId 1
       CardService.getAttachmentUrl(cardId)
            .then(response => {
                const existingPaths = response.data;
                setUploadedFiles(existingPaths);
            })
            .catch(error => {
                console.error('Error fetching existing paths:', error);
            });
    }, [cardId]);

    let isUploading = false;

    const uploadFile = async () => {
        if (isUploading) {
            console.log('Upload is already in progress.');
            return;
        }

        isUploading = true;

        const fileInput = document.getElementById('fileInput');
        const files = fileInput.files;

        if (files.length > 0) {
            try {

                const uploadPromises = Array.from(files).map(async (file) => {
                    const storageRef = ref(imageDb, `uploads/${file.name}`);
                    await uploadBytes(storageRef, file);
                });

                await Promise.all(uploadPromises);

                const filesInfoPromises = Array.from(files).map(async (file) => {
                    const storageRef = ref(imageDb, `uploads/${file.name}`);
                    const downloadURL = await getDownloadURL(storageRef);

                    return {
                        downloadURL,
                        fileName: file.name,
                        thumbnail: file.type.startsWith('image/')
                            ? URL.createObjectURL(file)
                            : 'https://firebasestorage.googleapis.com/v0/b/trelloimageupload.appspot.com/o/uploads%2Fpngwing.com.png?alt=media&token=122f8783-5c85-4cfa-91c8-8e3c0a582cf3',
                    };
                });

                const newFilesInfo = await Promise.all(filesInfoPromises);

                CardService.updateAttachmentUrl(cardId, newFilesInfo)
                    .then(response => {
                        console.log('Attachment URLs updated successfully:', response.data);
                        setUploadedFiles((prevFiles) => prevFiles.concat(newFilesInfo));
                    })
                    .catch(error => {
                        console.error('Error updating attachment URLs:', error);
                    });
            } catch (error) {
                console.error('Error uploading or fetching file information:', error);
            } finally {
                isUploading = false; // Đảm bảo thiết lập lại biến kiểm tra sau khi quá trình hoàn thành hoặc gặp lỗi
            }
        } else {
            alert('Please select a file.');
            isUploading = false; // Đảm bảo thiết lập lại biến kiểm tra trong trường hợp không có file được chọn
        }
    };



    return (
        <div>
            <h1>File Upload with Firebase</h1>
            <input type="file" id="fileInput" multiple onChange={uploadFile}/>
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