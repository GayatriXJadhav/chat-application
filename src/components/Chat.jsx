import React, { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import MessagesList from "./MessagesList";

import { useSocket } from "../Store/Socket";
import { useAuth } from "../Store/Auth";
import { IoMdArrowRoundBack } from "react-icons/io";

const Chat = ({
    open,
    set,
    contact,
    changeContact,
    info,
    messages,
    setMessages,
    changeMessages,
}) => {
    const socket = useSocket();
    const { user } = useAuth();

    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [messages]);

    const addMessage = async (message) => {
        socket.emit("sendMessage", {
            chatId: contact,
            userId: user.id,
            message,
        });
<<<<<<< HEAD
        setMessages((prevMessages) => [
            { text: message, isSender: true },
            ...prevMessages,
        ]);
=======
        setMessages((t) => [{ text: message, isSender: true }, ...t]);
        changeMessages(message, contact);
>>>>>>> 2968b55f3ff852488991be8cb3f35e79d5ac3e81
    };

    useEffect(() => {
        if (socket) {
            socket.on("getMessage", (data) => {
                if (data.chatId === contact) {
                    setMessages((prevMessages) => [
                        {
                            text: data.message,
                            isSender: data.userId === user.id,
                        },
                        ...prevMessages,
                    ]);
                    changeMessages(data.message, contact);
                }
            });
        }
        return () => {
            if (socket) {
                socket.off("getMessage");
            }
        };
    }, [socket, contact, user.id, setMessages]);

    return (
        <div className={`w-full flex flex-col ${!open && "hidden"} md:flex`}>
            <div className="w-full h-20 flex items-center border-b border-gray-300 bg-white">
                <IoMdArrowRoundBack
                    className="text-2xl ml-4 cursor-pointer"
                    onClick={() => {
                        changeContact("");
                        set(false);
                    }}
                />

                <div className="w-12 h-12 rounded-full mr-4 bg-gray-500 flex items-center justify-center text-white font-bold text-lg">
                    {info?.name[0].toUpperCase()}
                </div>

                <div className="flex flex-col">
                    <span className="text-sm font-semibold">{info.name}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-100">
                <div className="p-4" ref={ref}>
                    <MessagesList messages={messages} />
                </div>
            </div>

            <ChatInput addMessage={addMessage} />
        </div>
    );
};

export default Chat;
