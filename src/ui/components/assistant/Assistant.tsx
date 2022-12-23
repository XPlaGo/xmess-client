import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {resetAssistant, selectIsListening, setAssistantListening} from "../../../features/assistant/assistantSlice";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {Dispatch, ThunkDispatch} from "@reduxjs/toolkit";
import {
    resetChats,
    selectChats,
    selectSelectedChat,
    selectSelectedChatId,
    setSelectedChatId
} from "../../../features/chat/chatSlice";
import {
    selectContentState, selectNavigation, setAuthNav,
    setChatsClosed,
    setChatsOpened, setClientNav,
    setContentOpen,
    setInfoOpen, setSettingsNav, setSettingsSection
} from "../../../features/navigation/navigationSlice";
import {
    resetMessageInput,
    selectMessageInputDocuments,
    selectMessageInputText, setMessageInputDocuments,
    setMessageInputText
} from "../../../features/message-input/MessageInputSlice";
import {ChatProvider} from "../../tools/ChatProvider";
import {removeAuth, selectJwt, selectUsername} from "../../../features/auth/authSlice";
import axios from "axios";
import {useStompClient} from "react-stomp-hooks";
import React, {ChangeEvent, useRef} from "react";
import {setDark, setLight} from "../../../features/theme/themeSlice";
import {resetModal} from "../../../features/modal/modalSlice";




export default function Assistant(props: {dispatch: ThunkDispatch<any, any, any>
}) {

    const dispatch = useAppDispatch();

    const chats = useAppSelector(selectChats);
    const selectedChatId = useAppSelector(selectSelectedChatId);
    const username = useAppSelector(selectUsername);
    const stompClient = useStompClient();
    const selectedChat = useAppSelector(selectSelectedChat);
    const content = useAppSelector(selectNavigation).content;
    const jwt = useAppSelector(selectJwt);
    const setDocuments = (value: any) => dispatch(setMessageInputDocuments(value));
    const setInputValue = (value: any) => dispatch(setMessageInputText(value));

    const handleSend = async (inputText: string, documents: any) => {
        console.log("send")
        if (stompClient && selectedChat) {
            const documentsId = [];
            for (let document of documents) {
                let formData = new FormData();
                formData.append("file", document.file)
                let response = await axios.post(
                    "https://xmess-gateway-service.jelastic.regruhosting.ru/document/uploadWithMessage",
                    formData,
                    {
                        headers: {
                            Authorization: "Bearer " + jwt,
                            "Content-Type": "multipart/form-data",
                            chatId: selectedChat.id
                        }
                    }
                )
                documentsId.push(response.data)
            }
            stompClient.publish({
                body: JSON.stringify({
                    chatId: selectedChat.id,
                    textContent: inputText,
                    time: new Date(),
                    documents: documentsId
                }),
                destination: "/app/send",
                headers: {
                    Authorization: "Bearer " + jwt
                }
            })
            setDocuments([])
            setInputValue("");
        }
    }

    const defaultCommands = [
        {
            command: ["hello messenger", "привет мессенджер", "привет messenger"],
            callback: () => {
                props.dispatch(setAssistantListening(true))
            }
        }
    ];

    const commands = [
        {
            command: ["thank you", "спасибо"],
            callback: () => {
                props.dispatch(setAssistantListening(false))
            }
        },
        {
            command: ["open (the) * chat", "открой чат *"],
            callback: (chatTitle: string) => {
                if (content === "client") {
                    for (let chat of chats) {
                        if (ChatProvider.convertForChatItem(chat, username)?.title?.toLowerCase().includes(chatTitle.toLowerCase())) {
                            props.dispatch(setContentOpen(true))
                            props.dispatch(setSelectedChatId(chat.id))
                            props.dispatch(setInfoOpen(true))
                            props.dispatch(setChatsClosed())
                        }
                    }
                }
            }
        },
        {
            command: ["open settings", "открой настройки"],
            callback: () => {
                dispatch(setSettingsNav())
                dispatch(setInfoOpen(false))
                dispatch(setSelectedChatId(null))
            }
        },
        {
            command: ["close settings", "закрой настройки"],
            callback: () => {
                dispatch(setClientNav())
            }
        },
        {
            command: ["open (my) profile", "открой (мой) профиль"],
            callback: () => {
                dispatch(setSettingsNav())
                dispatch(setInfoOpen(false))
                dispatch(setSelectedChatId(null))
                dispatch(setSettingsSection("profile"))
            }
        },
        {
            command: ["close (my) profile", "закрой (мой) профиль"],
            callback: () => {
                dispatch(setClientNav())
            }
        },
        {
            command: ["close chat", "закрой чат", "закрой chat"],
            callback: () => {
                if (content === "client") {
                    props.dispatch(setSelectedChatId(null))
                    props.dispatch(setInfoOpen(false))
                    props.dispatch(setChatsOpened())
                }
            }
        },
        {
            command: ["log out of account", "выйди из аккаунта", "закрой chat"],
            callback: () => {
                dispatch(removeAuth());
                dispatch(setAuthNav());
                dispatch(resetAssistant());
                dispatch(resetChats());
                dispatch(resetMessageInput());
                dispatch(resetModal());
            }
        },
        {
            command: ["send message *", "отправь сообщение *"],
            callback: (text: string) => {
                if (selectedChatId != null) {
                    props.dispatch(setMessageInputText(text))
                    handleSend(text, []);
                }
            }
        }
    ];

    const isListening = useAppSelector(selectIsListening);
    const { transcript, resetTranscript } = useSpeechRecognition({commands: !isListening ? defaultCommands : commands});
    SpeechRecognition.startListening({
        continuous: true,
    })

    return (
        <>
        </>
    )
}
