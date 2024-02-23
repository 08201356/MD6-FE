import React, {useState} from 'react';
import {
    Button, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";

const InviteFriendWorkspace = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [workspaceEmail, setWorkspaceEmail] = useState("")
    const isButtonDisabled = !workspaceEmail;

    const handleContinue = () => {
        if (!workspaceEmail) {
            console.error("Please fill in all fields.");
        }
        // axios.post("/api/create-workspace", {
        //     name: workspaceEmail
        // })
        //     .then(response => {
        //     })
        //     .catch(error => {
        //         console.error("Error creating workspace:", error);
        //     });
    };
    return (
        <div>
            <Button onClick={onOpen}>Trigger modal</Button>

            <Modal size={"6xl"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton/>
                    <ModalBody className="bg-blue-100">
                    <div className="flex">
                            <div className="flex flex-col w-[50%] space-y-8 pl-5 pt-10 flex-1 bg-white">
                                <div className="w-[80%]">
                                    <p className="text-2xl font-bold font-sans">Invite your team</p>
                                    <p className="text-xl font-sans">Trello makes teamwork your best work. Invite your
                                        new team members to get going!</p>
                                </div>

                                <div className="w-[80%]">
                                    <div>
                                        <p className="text-lg font-bold font-sans">Workspace members</p>
                                    </div>
                                    <Input value={workspaceEmail}
                                           onChange={(e) => setWorkspaceEmail(e.target.value)} placeholder="e.g. calrissian@cloud.ci"/>
                                    <div className="flex space-x-1">
                                        <p className="font-bold" >Pro tip!</p>
                                        <p className="">Add multiple emails, or invite them with one link.</p>
                                    </div>
                                </div>

                                <div><Button onClick={handleContinue} isDisabled={isButtonDisabled} className="w-[80%]" colorScheme='blue'>Continue</Button></div>
                            </div>
                            <div className="w-[40%] mx-auto justify-center flex-1 bg-blue-100">
                                <img className="w-full"  src='https://trello.com/assets/d1f066971350650d3346.svg' />
                            </div>
                    </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default InviteFriendWorkspace;
