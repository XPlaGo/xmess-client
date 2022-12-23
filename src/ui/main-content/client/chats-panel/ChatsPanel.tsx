import React, {useEffect, useState} from "react";
import {StompSessionProvider, useSubscription} from "react-stomp-hooks";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectAuth, selectJwt, selectRefreshToken, selectUsername} from "../../../../features/auth/authSlice";
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import ButtonWithIcon from "../../../components/button/with-icon/ButtonWithIcon";
import {selectTheme, Theme} from "../../../../features/theme/themeSlice";
import ChatItem from "./chat-item/ChatItem";
import InputText from "../../../components/input/text/InputText";
import "./ChatsPanel.css";
import {
    ChatData,
    selectSelectedChatId,
    selectChats,
    setChatsData,
    updateChat, setSelectedChatId, setChatMemberAvatar, MemberInfo, setChatAvatar
} from "../../../../features/chat/chatSlice";
import useUIType from "../../../tools/hooks/useUIType";
import {
    selectChatsPanelState,
    selectContentState,
    setChatsClosed,
    setChatsOpened, setContentOpen
} from "../../../../features/navigation/navigationSlice";
import LoaderSimple from "../../../components/loader/LoaderSimple";
import {ChatProvider} from "../../../tools/ChatProvider";
import {AuthService} from "../../../../service/auth/AuthService";
import ButtonThird from "../../../components/button/third/ButtonThird";
import {AvatarService} from "../../../../service/auth/AvatarService";
import Avatar from "../../../components/avatar/Avatar";
import axios from "axios";
import {setModalContent, setModalState} from "../../../../features/modal/modalSlice";
import NewChat from "../../../components/modal/new-chat/NewChat";
import Check from "../../../components/check/Check";


export interface ChatsPanelProps {
}

export default function ChatsPanel(props: ChatsPanelProps) {

    const jwt = useAppSelector(selectJwt);
    const chatsState = useAppSelector(selectChatsPanelState);
    const [isOpened, setOpened] = useState(false);
    const UIType = useUIType();

    const dispatch = useAppDispatch();

    const headers = {
        Authorization: `Bearer ${jwt}`
    }

    return (
            <motion.div layout
                        key={"chatsPanel"}
                        transition={{
                            type: "easeInOut"
                        }}
                        className={`ChatsPanel ${chatsState} ${UIType}`}>
                    <Chats setOpened={setOpened} isOpened={isOpened}/>
            </motion.div>
    )
}

function Chats(
    props: {
        isOpened: boolean,
        setOpened: (value: boolean) => void,
    }
) {

    const theme: Theme = useAppSelector(selectTheme);
    const username = useAppSelector(selectUsername);
    const chatsState = useAppSelector(selectChatsPanelState);
    const chatsData = useAppSelector(selectChats);
    const selectedChatId = useAppSelector(selectSelectedChatId);
    const jwt = useAppSelector(selectJwt);
    const UIType = useUIType();

    const dispatch = useAppDispatch();

    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState<MemberInfo[]>([]);
    const [isLoading, setLoading] = useState(true);

    const messageHandler = (message: ChatData | ChatData[]) => {
        setLoading(false)
        if (message instanceof Array<ChatData>) {
            if (chatsData.length === 0) {
                dispatch(setChatsData(
                    message.sort((i, j) => i.lastMessageTime < j.lastMessageTime ? 1 : -1)
                ));
                for (let chat of message) {
                    if (chat.avatarId != null) {
                        AvatarService.loadAvatar(chat.avatarId, jwt)?.then((base64) => {
                            dispatch(setChatAvatar({id: chat.id, data: base64}))
                        })
                    }
                    for (let member of chat.members) {
                        AvatarService.loadAvatar(member.avatarId, jwt)?.then((base64) => {
                            dispatch(setChatMemberAvatar({chatId: chat.id, member: member.username, data: base64}))
                        })
                    }
                }
            }
        } else {
            dispatch(updateChat({
                id: message.id,
                data: message
            }));
            const chat = message
            if (chat.avatarId != null && chat.avatar == null) {
                AvatarService.loadAvatar(chat.avatarId, jwt)?.then((base64) => {
                    dispatch(setChatAvatar({id: chat.id, data: base64}))
                })
            }
            for (let member of chat.members) {
                if (member.avatarId != null && member.avatar == null)
                    AvatarService.loadAvatar(member.avatarId, jwt)?.then((base64) => {
                        dispatch(setChatMemberAvatar({chatId: chat.id, member: member.username, data: base64}))
                    })
            }
        }
    }

    useSubscription("/user/update/chats", (message) => {
        messageHandler(JSON.parse(message.body))
    });

    const headers = {
        Authorization: "Bearer " + jwt
    }

    const searchHandler = (event: any) => {
        if (event.target.value.length <= 3) setSearchResult([]);
        else
        axios.post("https://xmess-gateway-service.jelastic.regruhosting.ru/chats/searchUsersGlobal", {part: event.target.value}, {headers: headers})
            .then((res) => {
                if (res.data instanceof Array<any>)
                    setSearchResult(res.data);
            })
    }

    const chats: Array<ChatData | null> = [];

    chatsData.forEach((chat, id) => {
        chats.push(ChatProvider.convertForChatItem(chat, username));
    })

    const chatsElements = chats.sort((i, j) => {
        if (i != null && j != null)
            return i?.lastMessageTime < j?.lastMessageTime ? 1 : -1
        return 0
    }).filter((data) => {
        if (data != null && searchText !== "" && searchText != null) {
            return data?.title?.toLowerCase().includes(searchText.toLowerCase());
        } else return true;
    }).map(data => <ChatItem isActive={selectedChatId != null && data?.id === selectedChatId} key={String(data?.id)} data={data}/>)

    const handleTabletChatPanel = () => {
        if (chatsState === "opened") {
            dispatch(setChatsClosed())
            dispatch(setContentOpen(true))
        } else {
            dispatch(setChatsOpened())
            dispatch(setContentOpen(true))
        }
    }

    return (
        <motion.div layout
                    transition={{
                        type: "easeInOut"
                    }}
                    className={"box"}>
            <LayoutGroup>
                <motion.div layout
                            animate={{
                                borderColor: theme.colors.client.chats.header.border,
                                background: theme.colors.client.chats.header.background,
                            }}
                            transition={{
                                type: "easeInOut"
                            }}
                            className={"header"}>
                    {(chatsState === "opened" || UIType !== "tablet") &&
                        <>
                            <motion.h2
                                key={"h2"}
                                layout
                                //initial={{opacity: 0}}
                                //exit={{opacity: 0}}
                                animate={{color: theme.colors.client.chats.header.h2.color, opacity: 1}}>
                                Chats
                            </motion.h2>
                            <motion.div key={"search"} layout className={"searchBox"}>
                                <InputText placeholder={"Search"} value={searchText} type={"text"} onChange={searchHandler} setValue={setSearchText}/>
                                <ButtonWithIcon icon={theme.colors.client.chats.header.buttonIcon} onClickAction={() => {
                                    dispatch(setModalState(true));
                                    dispatch(setModalContent(<NewChat/>));
                                }}/>
                            </motion.div>
                        </>
                    }
                    {UIType === "tablet" &&
                        <ButtonThird className={"arrow"} icon={theme.colors.client.chats.header.arrow} onClickAction={handleTabletChatPanel}/>
                    }
                </motion.div>
                <motion.div
                    layout
                    animate={{
                        borderColor: theme.colors.client.chats.list.border,
                        background: theme.colors.client.chats.list.background,
                    }}
                    transition={{
                        type: "easeInOut"
                    }}
                    className={"list"}>
                    <motion.ul layout
                               transition={{
                                   type: "easeInOut"
                               }}>
                        <AnimatePresence>
                            {isLoading ? <LoaderSimple color={theme.colors.loader.simple.color}/> : (chatsElements.length === 0 ? <motion.span layout animate={{color: theme.colors.textSecond}}>No chats</motion.span> : chatsElements)}
                        </AnimatePresence>
                    </motion.ul>
                    {
                        searchText !== "" && searchResult.length > 0 && <GlobalSearch addUser={() => {}} removeUser={() => {}} type={"add"} searchResult={searchResult}/>
                    }
                </motion.div>
            </LayoutGroup>
        </motion.div>
    )
}

export function GlobalSearch(props: {
    searchResult: MemberInfo[],
    type: "add" | "check",
    addUser: (user: MemberInfo) => void,
    removeUser: (user: MemberInfo) => void,
}) {

    const theme = useAppSelector(selectTheme);
    const username = useAppSelector(selectUsername);

    const users = props.searchResult.filter(info => info.username !== username)
        .map(memberInfo => <User addUser={props.addUser} removeUser={props.removeUser} type={props.type} key={memberInfo.username} data={memberInfo}/>)

    return (
        <motion.div layout
                    animate={{
                    }}
                    className={"GlobalSearch"}>
            <motion.p layout animate={{color: theme.colors.textSecond}}>Global Search</motion.p>
            <motion.ul layout>
                <AnimatePresence>
                    {props.searchResult.length > 0 ? users : "No results"}
                </AnimatePresence>
            </motion.ul>
        </motion.div>
    )
}

interface UserProps {
    data: MemberInfo | null,
    type: "add" | "check",
    addUser: (user: MemberInfo) => void,
    removeUser: (user: MemberInfo) => void
}

export function User(props: UserProps) {

    const theme = useAppSelector(selectTheme);
    const chats = useAppSelector(selectChats);
    const jwt = useAppSelector(selectJwt);

    let hasChat = false;
    for (let chat of chats) {
        if (chat.chatType === "DIALOGUE"
            && props.data?.username != null
            && chat.members.map(user => user.username).indexOf(props.data?.username) !== -1) {
            hasChat = true;
        }
    }

    const headers = {
        Authorization: "Bearer " + jwt
    }

    return (
        <motion.li layout
                   initial={{opacity: 0}}
                   exit={{opacity: 0}}
                   key={props.data?.username}
                   animate={{borderColor: theme.colors.client.chats.list.chatItem.border, opacity: 1}}
                   className={"SearchUser"}>
            <Avatar isOnline={props.data?.status === "ONLINE"} type={"DIALOGUE"} avatar={props.data?.avatar} size={60}/>
            <motion.p layout animate={{color: theme.colors.textMain}}>{props.data?.username}</motion.p>
            {
                props.type === "add" ?
                    (!hasChat &&
                    <ButtonThird icon={theme.media.add} onClickAction={() => {
                        axios.post(
                            "https://xmess-gateway-service.jelastic.regruhosting.ru/chats/newDialogue",
                            {interlocutorUsername: props.data?.username},
                            {headers: headers}
                        )
                    }}/>) :
                <Check onOn={() => {
                    if (props.data != null) props.addUser(props.data)
                }} onOff={() => {
                    if (props.data != null) props.removeUser(props.data)
                }}/>
            }
        </motion.li>
    )
}
