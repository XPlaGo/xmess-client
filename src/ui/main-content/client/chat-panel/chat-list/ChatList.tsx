import {useAppSelector} from "../../../../../app/hooks";
import {selectSelectedChatId, selectChats, selectSelectedChat} from "../../../../../features/chat/chatSlice";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {useStompClient, useSubscription} from "react-stomp-hooks";
import {AnimatePresence, motion, LayoutGroup} from "framer-motion";
import "./ChatList.css";
import {selectTheme} from "../../../../../features/theme/themeSlice";
import ChatMessage, {MessageData} from "./message/ChatMessage";
import LoaderSimple from "../../../../components/loader/LoaderSimple";
import Scroll, {Events, Element} from "react-scroll";
import {selectJwt} from "../../../../../features/auth/authSlice";
import axios from "axios";

export interface ChatListProps {

}

const scroll = Scroll.animateScroll;

export default function ChatList(props: ChatListProps) {

    const [messages, setMessages] = useState<Array<MessageData>>([]);
    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [isEnd, setEnd] = useState<boolean>(true);

    const theme = useAppSelector(selectTheme);
    const selectedChat = useAppSelector(selectSelectedChat);
    const selectedChatId = useAppSelector(selectSelectedChatId);
    const jwt = useAppSelector(selectJwt);
    const list: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const StompClient = useStompClient();

    //console.log(selectedChatId);

    const parseMessage = (message: any) => {
        console.log(message)
        setLoading(false)
        if (message.messages != null) {
            if (message.messages.length > 0) {
                const newMessages = [...messages];
                console.log(messages.length)

                for (let mes of message.messages) {
                    let flag = false;
                    for (let i = 0; i < newMessages.length; i++) {
                        if (mes.id === newMessages[i].id) {
                            console.log("merge")
                            newMessages[i] = mes;
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        newMessages.push(mes)
                    }
                }

                if (message.messages.length < 20) setEnd(true)
                else {
                    setEnd(false)
                }

                setMessages(newMessages)
                setPage(message.page);
            } else {
                setEnd(true)
            }
        } else {
            let flag = false;
            const newMessages = messages.map(mes => {
                if (mes.id === message.id) {
                    flag = true;
                    return message;
                }
                else return mes;
            })
            if (!flag) newMessages.unshift(message);
            setMessages(newMessages);
            scroll.scrollMore(500);
        }
    }

    /*useEffect(() => {
        //setLoading(true);
        if (StompClient != null && selectedChatId != null) StompClient.subscribe("/user/update/messages/" + selectedChatId, (message) => parseMessage(JSON.parse(message.body)))
    }, [StompClient])*/

    useEffect(() => {
        setPage(0);
        //console.warn("clear")
        setMessages([]);
    }, [selectedChatId])

    const messagesElements = messages.map((item, id) => {
        let className = "end";
        if (id > 0 && id < messages.length - 1 && messages[id - 1].sender === item.sender && messages[id + 1].sender === item.sender)
            className = "middle";
        if (id === messages.length - 1 || messages[id + 1].sender != item.sender)
            className = "once";
        let sender = null;
        if (selectedChat != null)
            for (let member of selectedChat?.members) {
                if (member.username === item.sender) {
                    sender = member;
                    break;
                }
            }
        return <ChatMessage sender={sender} chatType={selectedChat?.chatType} className={item.sender == null ? "info" : className} key={item.id} data={item}/>
    })

    const headers = {
        Authorization: "Bearer " + jwt
    }

    const updateMessages = (event: any) => {
        if (list.current != null && (list.current?.scrollHeight + list.current?.scrollTop - list.current?.offsetHeight <= 10) && !isLoading) {
            setEnd(false);
            StompClient?.publish({
                body: JSON.stringify({page: page + 1, chatId: selectedChatId}),
                destination: "/app/loadMessages",
                headers: headers
            })
        }
    }

    useSubscription("/user/update/messages/" + selectedChatId, (message) => parseMessage(JSON.parse(message.body)));

    return (
        <motion.div layout
                    ref={list}
                    animate={{
                        borderColor: theme.colors.client.chat.list.border
                    }}
                    onScroll={updateMessages}
                    className={"ChatList"}>
            <LayoutGroup>
                {isLoading ? <LoaderSimple animate={isEnd ? "hidden" : "visible"} className={"messagesLoader"}/> :
                    messagesElements.length > 0 &&
                        <>
                            {messagesElements}
                            <LoaderSimple animate={isEnd ? "hidden" : "visible"} className={"messagesLoader"}/>
                        </>
                }
            </LayoutGroup>
        </motion.div>
    )
}
