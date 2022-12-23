import {selectTheme, Theme} from "../../../../../features/theme/themeSlice";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {ChatData, selectSelectedChatId, selectChats, setSelectedChatId} from "../../../../../features/chat/chatSlice";
import {AnimatePresence, LayoutGroup, motion, useAnimation} from "framer-motion";
import useUIType from "../../../../tools/hooks/useUIType";
import {
    selectChatsPanelState,
    setChatsClosed, setChatsOpened, setContentOpen, setInfoOpen
} from "../../../../../features/navigation/navigationSlice";
import {Fragment, useState} from "react";
import Avatar from "../../../../components/avatar/Avatar";
import {selectUsername} from "../../../../../features/auth/authSlice";

interface ChatItemProps {
    data: ChatData | null,
    isActive: boolean
}

export default function ChatItem(props: ChatItemProps) {

    const theme: Theme = useAppSelector(selectTheme);
    const selectedChatId = useAppSelector(selectSelectedChatId);
    const chatsState = useAppSelector(selectChatsPanelState);
    const username = useAppSelector(selectUsername);
    const UIType = useUIType();

    const dispatch = useAppDispatch();

    const variantsChatItem = {
        active: {
            borderColor: theme.colors.client.chats.list.chatItem.box.borderActive,
            background: theme.colors.client.chats.list.chatItem.box.backgroundActive,
            boxShadow: "0 0 20px " + theme.colors.client.chats.list.chatItem.box.shadowActive,
        },
        hover: {
            borderColor: "rgba(0, 0, 0, 0)",
            background: theme.colors.client.chats.list.chatItem.box.backgroundActive,
        },
        click: {
            borderColor: theme.colors.client.chats.list.chatItem.box.borderActive,
            background: theme.colors.client.chats.list.chatItem.box.background,
            boxShadow: "0 0 20px " + theme.colors.client.chats.list.chatItem.box.shadowActive,
        },
        default: {
            borderColor: theme.colors.client.chats.list.chatItem.box.border,
            background: theme.colors.client.chats.list.chatItem.box.background,
            boxShadow: "0 0 20px " + theme.colors.client.chats.list.chatItem.box.shadow,
        }
    }

    let time = (props.data?.lastMessageTime != null) ? convertToTimeMod(new Date(props.data?.lastMessageTime)) : "";

    let isOnline = false;

    if (props.data?.chatType === "DIALOGUE") {
        for (let member of props.data.members) {
            if (member.username !== username && member.status === "ONLINE") isOnline = true;
        }
    }

    let lastMessage = props.data?.lastMessage;

    if (lastMessage && lastMessage?.length >= 20)
        lastMessage = lastMessage?.substring(0, 20) + "..."

    return (
        <motion.li
            onClick={() => {
                dispatch(setContentOpen(true))
                if (props.data?.id === selectedChatId) {
                    dispatch(setSelectedChatId(null))
                    dispatch(setInfoOpen(false))
                    dispatch(setChatsOpened())
                }
                else {
                    dispatch(setSelectedChatId(props.data === null ? null : props.data.id))
                    dispatch(setInfoOpen(true))
                    dispatch(setChatsClosed())
                }
            }}
            layout
            transition={{
                type: "easeInOut"
            }}
            key={String(props.data?.id)}
            className={`ChatItem ${chatsState} ${UIType}`}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            animate={{
                opacity: 1,
                borderColor: theme.colors.client.chats.list.chatItem.border
            }}>

            <motion.div
                layout
                whileTap={"click"}
                whileHover={"hover"}
                animate={props.isActive ? "active" : "default"}
                transition={{
                    type: "easeInOut"
                }}
                variants={variantsChatItem}
                className={"chatItemBox"}>
                <AnimatePresence>
                    <Avatar type={props.data?.chatType} avatar={props.data?.avatar} size={60} isOnline={isOnline}/>
                    {(chatsState === "opened" || UIType !== "tablet") &&
                        <Fragment key={"ok"}>
                            <motion.h3
                                key={"h3"}
                                layout
                                transition={{
                                    type: "easeInOut"
                                }}
                                animate={{
                                    color: theme.colors.client.chats.list.chatItem.box.color,
                                    opacity: 1
                                }}
                                exit={{opacity: 0}}
                                initial={{opacity: 0}}
                                className={"title"}>{props.data?.title}</motion.h3>
                            <motion.p
                                key={"p"}
                                layout
                                transition={{
                                    type: "easeInOut"
                                }}
                                animate={{
                                    color: theme.colors.client.chats.list.chatItem.box.colorSecond,
                                    opacity: 1
                                }}
                                exit={{opacity: 0}}
                                initial={{opacity: 0}}
                                className={"last"}>{lastMessage}</motion.p>
                            {
                                props.data?.hasUnreadMessage ?
                                    <motion.span
                                        layout
                                        key={"indicator"}
                                        initial={{scale: 0.5, opacity: 0}}
                                        exit={{scale: 0.5, opacity: 0}}
                                        animate={{
                                            scale: 1,
                                            opacity: 1,
                                            background: theme.colors.client.chats.list.chatItem.box.indicatorBackground,
                                            boxShadow: `0 0 20px ${theme.colors.client.chats.list.chatItem.box.indicatorShadow}`
                                        }}
                                        transition={{
                                            type: "easeInOut"
                                        }}
                                        className={"indicator"}>

                                    </motion.span> :
                                    <motion.span
                                        key={"time"}
                                        layout
                                        initial={{scale: 0.5, opacity: 0}}
                                        exit={{scale: 0.5, opacity: 0}}
                                        animate={{
                                            scale: 1,
                                            opacity: 1,
                                            color: theme.colors.client.chats.list.chatItem.box.colorSecond
                                        }}
                                        transition={{
                                            type: "easeInOut"
                                        }}
                                        className={"time"}>{time}</motion.span>
                            }
                        </Fragment>
                    }
                </AnimatePresence>
            </motion.div>
        </motion.li>
    )
}

function convertToTimeMod(time: Date): string {
    let dif = new Date().getTime() - time.getTime();
    let ss = Math.floor(dif / 1000);
    let ms = Math.floor(dif / 1000 / 60);
    let hs = Math.floor(dif / 1000 / 60 / 60);
    let ds = Math.floor(dif / 1000 / 60 / 60 / 24);
    let mns = Math.floor(dif / 1000 / 60 / 60 / 24 / 30);
    let ys = Math.floor(dif / 1000 / 60 / 60 / 24 / 365);

    if (ys > 0) {
        if (ys === 1) return "1 year ago"
        else return ys + " years ago"
    }
    if (mns > 0) {
        if (mns === 1) return  "1 mo ago"
        else return mns + " mos ago"
    }
    if (ds > 0) {
        if (ds === 1) return  "1 day ago"
        else return ds + " days ago"
    }
    if (hs > 0) {
        if (hs === 1) return  "1 h ago"
        else return hs + " h ago"
    }
    if (ms > 0) {
        if (ms === 1) return  "1 min ago"
        else return ms + " min ago"
    }
    if (ss > 0) {
        if (ss === 1) return  "1 sec ago"
        else return ss + " sec ago"
    }
    else return "now"
}
