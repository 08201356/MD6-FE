import React, {useState, useEffect} from 'react';
import Stomp from 'stompjs';
import SockJs from 'sockjs-client';
import {IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography} from "@mui/material";
import {Avatar, Button} from "@chakra-ui/react";

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJs('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe('/topic/messages', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        });

        setStompClient(client);

        return () => {
            client.disconnect();
        };
    }, []);

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = () => {
        if (message.trim()) {
            const chatMessage = {
                nickname,
                content: message
            };

            stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
            setMessage('');
        }
    };

    return (
        <div>
            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar>{msg.nickname.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                            <div>
                                <Typography variant="subtitle1">{msg.nickname}</Typography>
                                <Typography variant="body2" color="textSecondary">{msg.notification}</Typography>
                            </div>
                            }
                            secondary={msg.content}
                        />
                    </ListItem>
                ))}
            </List>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    id="outlined-basic"
                    label="nickname"
                    placeholder="Enter your nickname"
                    value={nickname}
                    onChange={handleNicknameChange}
                    autoFocus
                />
                <TextField
                    id="outlined-basic"
                    label="message"
                    placeholder="Type a message"
                    value={message}
                    onChange={handleMessageChange}
                    fullWidth
                />
                <IconButton onClick={sendMessage} disabled={!message.trim()}>
                    send
                </IconButton>
            </div>
        </div>
    );
};

export default WebSocketComponent;
