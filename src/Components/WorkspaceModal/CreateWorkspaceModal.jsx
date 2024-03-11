import React, {useEffect, useState} from 'react';
import {
    Button, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay, Select, Textarea, useDisclosure
} from "@chakra-ui/react";
import axios from "axios";
import InviteFriendWorkspace from "./InviteFriendWorkspace";
import AuthService from "../../Service/auth.service";
const CreateWorkspaceModal = ({isOpen, onOpen, onClose,workspaceName,setWorkspaceName,workspaceType,setWorkspaceType,workspaceDescription,setWorkspaceDescription}) => {
    const isButtonDisabled = !workspaceName || !workspaceType;
    const secondModalDisclosure = useDisclosure()
    const [workspaceTypes, setWorkspaceTypes] = useState([]);
    const user = AuthService.getCurrentUser();
    useEffect(() => {
        axios.get("http://localhost:8080/api/workspaces/type")
            .then(response => {
                setWorkspaceTypes(response.data);
            })
            .catch(error => {
                console.error("Error fetching workspace types:", error);
            });
    }, []);

    const handleContinue = () => {
        const frontendURL = window.location.origin;

        axios.post("http://localhost:8080/api/workspaces/create", {
            email: user.email,
            name: workspaceName,
            description: workspaceDescription,
            workspaceType,
            frontendURL: frontendURL
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error("Error creating workspace:", error);
            });
        secondModalDisclosure.onOpen();
        onClose(setWorkspaceName(null), setWorkspaceType(null), setWorkspaceDescription(null));
    };
    const handleModalClose = () => {
        setWorkspaceName("");
        setWorkspaceType("");
        setWorkspaceDescription("");
        onClose();
    };
    return (
            <>
                <Modal size={"6xl"} onClose={handleModalClose} isOpen={isOpen} isCentered >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton/>
                        <ModalBody className="bg-blue-100">
                            <div className="flex justify-between w-full mx-0">
                                <div className="flex flex-col w-[50%] space-y-8 pl-20 pt-10 flex-1 bg-white">
                                    <div className="w-[80%]">
                                        <p className="text-2xl font-bold font-sans">Let's build a Workspace</p>
                                        <p className="text-xl font-sans">Boost your productivity by making it easier for everyone to access boards in one location.</p>
                                    </div>
                                    <div className="w-[80%]">
                                        <p className="text-sm font-bold font-sans">Workspace name</p>
                                        <Input  value={workspaceName}
                                                onChange={(e) => setWorkspaceName(e.target.value)} placeholder="Taco's Co." />
                                        <p className="text-xs font-sans">This is the name of your company, team or organization.</p>
                                    </div>
                                    <div className="w-[80%]">
                                        <p className="text-sm font-bold font-sans">Workspace type</p>
                                        <Select  value={workspaceType}
                                                 onChange={(e) => setWorkspaceType(e.target.value)} placeholder='Choose...'>
                                            {workspaceTypes.map(type => (
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="w-[80%]">
                                        <p className="text-sm font-bold font-sans">Workspace description </p>
                                        <Textarea value={workspaceDescription}
                                                  onChange={(e) => setWorkspaceDescription(e.target.value)} placeholder='Our team organizes everything here.' />
                                        <p className="text-xs font-sans">Get your members on board with a few words about your Workspace.</p>
                                    </div>
                                    <div><Button onClick={handleContinue} isDisabled={isButtonDisabled} className="w-[80%]" colorScheme='blue' >Continue</Button></div>
                                </div>

                                <div className="w-[40%] mx-auto justify-center flex-1 bg-blue-100">
                                    <img className="flex w-full items-center justify-center mt-20 "  src='https://trello.com/assets/d1f066971350650d3346.svg' />
                                </div>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
                <InviteFriendWorkspace isOpen={secondModalDisclosure.isOpen} onOpen={secondModalDisclosure.onOpen} onClose={secondModalDisclosure.onClose}/>
            </>
        )
};

export default CreateWorkspaceModal;