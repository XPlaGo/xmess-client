import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import "./ChatMessage.css";
import {useAppSelector} from "../../../../../../app/hooks";
import {selectJwt, selectUsername} from "../../../../../../features/auth/authSlice";
import {selectTheme} from "../../../../../../features/theme/themeSlice";
import React, {useEffect, useRef, useState} from "react";
import ButtonThird from "../../../../../components/button/third/ButtonThird";
import Avatar from "../../../../../components/avatar/Avatar";
import {MemberInfo} from "../../../../../../features/chat/chatSlice";
import Document from "../../../../../components/document/Document";
import {useStompClient} from "react-stomp-hooks";

export interface MessageData {
    id: string,
    chatId: string,
    textContent: string,
    time: number,
    documents: Array<DocumentData>,
    sender: string,
    status: {[username:string]:string},
    type: string
}

export interface DocumentData {
    id: string,
    name: string,
    size: number,
    chatId: string | null
}

export interface MessageProps {
    data: MessageData,
    className: string,
    chatType: string | null | undefined,
    sender: MemberInfo | null | undefined
}

export default function ChatMessage(props: MessageProps) {

    const username = useAppSelector(selectUsername);
    const theme = useAppSelector(selectTheme);
    const date = new Date(props.data.time);
    const jwt = useAppSelector(selectJwt);

    const [isHover, setHover] = useState(false);

    const StompClient = useStompClient();

    const isSelf = props.data.sender === username;
    let e: string | number | NodeJS.Timeout | null | undefined = null;

    const documentsElements = props.data.documents.map((doc, i) => {
        return <Document key={i} type={"MESSAGE"} number={i} id={doc.id} name={doc.name} removeItem={() => {}}/>
    })

    let isRead = true;
    for (let user in props.data.status) {
        if (user !== username && props.data.status[user] === "SENT") isRead = false;
    }

    useEffect(() => {
        if (!isSelf && username && props.data.status[username] !== "RECEIVED") {
            StompClient?.publish({
                body: JSON.stringify({id: props.data.id}),
                destination: "/app/readMessage",
                headers: {
                    Authorization: "Bearer " + jwt
                }
            })
        }
    }, [])

    const docsScroll: any = useRef(null);

    if (props.className === "info") {
        return (
            <motion.li layout
                       initial={{opacity: 0}}
                       animate={{opacity: 1, color: theme.colors.textSecond}}
                       className={"ChatMessage info"}
                       transition={{
                           type: "easeInOut"
                       }}>
                {props.data.textContent}
            </motion.li>
        )
    }

    return (
        <motion.li layout
                   key={props.data.id}
                   onMouseEnter={() => {
                       e = setTimeout(() => setHover(true), 500)
                   }}
                   onMouseLeave={() => {
                       if (e != null) clearTimeout(e)
                       setHover(false)
                   }}
                   initial={{opacity: 0}}
                   animate={{opacity: 1}}
                   transition={{
                       type: "easeInOut"
                   }}
                   className={"ChatMessage" + (isSelf ? " self " : (props.className === "info" ? " " : " other ")) + props.className}>
            <>
                <AnimatePresence>
                    { props.chatType === "GROUP" && props.className === "once" && !isSelf &&
                        <motion.div key={"sender"} layout className={"sender"}>
                            <Avatar type={"DIALOGUE"} avatar={props.sender?.avatar} size={40} isOnline={false}/>
                            <motion.p layout
                                      animate={{color: theme.colors.client.chat.list.message.color}}
                                      className={"senderUsername"}>{props.sender?.username}</motion.p>
                        </motion.div>
                    }
                    <ButtonThird
                        keyValue={"dots"}
                        initialStyle={{scale: 0.8, opacity: 0}}
                        exitStyle={{scale: 0.8, opacity: 0}}
                        defaultStyle={{scale: 1, opacity: isHover ? 1 : 0}}
                        icon={theme.media.copy}
                        onClickAction={() => {
                            navigator.clipboard.writeText(props.data.textContent)
                        }}/>
                    <motion.span layout
                                 key={"time"}
                                 initial={{
                                     opacity: 0,
                                     scale: 0.8
                                 }}
                                 animate={{
                                     opacity: isHover ? 1 : 0,
                                     scale: 1,
                                     color:  theme.colors.client.chat.list.message.timeColor
                                 }}
                                 exit={{
                                     opacity: 0,
                                     scale: 0.8
                                 }}
                             className={"time"}>{date.getHours()}:{date.getMinutes() < 10 ? "0" : ""}{date.getMinutes()}</motion.span>
                    { documentsElements.length > 0 &&
                        <motion.div ref={docsScroll} layout className={"documentsBox"} key={"docs"}>
                            <motion.div drag={"x"} dragConstraints={docsScroll}>
                                {documentsElements}
                            </motion.div>
                        </motion.div>
                    }
                    { !isRead && isSelf &&
                        <motion.p key={"ind"}
                                  layout
                                  initial={{opacity: 0}}
                                  exit={{opacity: 0}}
                                  animate={{opacity: 1}}
                                  className={"readInd"}></motion.p>
                    }
                    <motion.div layout
                                key={"box"}
                                animate={{
                                    borderColor: theme.colors.border,
                                    boxShadow: "0 0 20px " + isSelf ?
                                        theme.colors.client.chat.list.message.selfShadow :
                                        theme.colors.client.chat.list.message.shadow,
                                    background: (isSelf ?
                                            theme.colors.client.chat.list.message.selfBackground :
                                            theme.colors.client.chat.list.message.otherBackground
                                    ),
                                    color: isSelf ?
                                        theme.colors.client.chat.list.message.selfColor :
                                        theme.colors.client.chat.list.message.color
                                }}
                                className={"ChatMessageBox"}>
                        <motion.p layout className={"textContent"}>{props.data.textContent}</motion.p>
                    </motion.div>
                </AnimatePresence>
            </>
        </motion.li>
    )
}
