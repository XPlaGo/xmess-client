import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import "./InfoPanel.css";
import {
    ChatData,
    MemberInfo,
    selectChats,
    selectSelectedChat,
    selectSelectedChatId,
    setChatsData, setSelectedChatId
} from "../../../../features/chat/chatSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {ChatProvider} from "../../../tools/ChatProvider";
import {selectJwt, selectUsername} from "../../../../features/auth/authSlice";
import {selectTheme} from "../../../../features/theme/themeSlice";
import ButtonWithIcon from "../../../components/button/with-icon/ButtonWithIcon";
import Avatar from "../../../components/avatar/Avatar";
import ButtonThird from "../../../components/button/third/ButtonThird";
import React, {useEffect, useRef, useState} from "react";
import Document from "../../../components/document/Document";
import {DocumentData} from "../chat-panel/chat-list/message/ChatMessage";
import {setModalContent, setModalState} from "../../../../features/modal/modalSlice";
import Accept from "../../../components/modal/accept/Accept";
import axios from "axios";
import {setInfoOpen} from "../../../../features/navigation/navigationSlice";

export interface InfoPanelProps {

}

export default function InfoPanel(props: InfoPanelProps) {
    const selectedChat = useAppSelector(selectSelectedChat);
    const username = useAppSelector(selectUsername);
    const chatData = ChatProvider.convertForChatItem(selectedChat, username);
    return (
        <motion.div layout className={"InfoPanel"} transition={{type: "easeInOut"}}>
            <AnimatePresence>
                <LayoutGroup>
                    <Info data={chatData}/>
                    <motion.div layout className={"InfoOptScroll"}>
                        <ChatMedia/>
                        <ChatDocuments documents={selectedChat?.documents}/>
                        {
                            selectedChat?.chatType === "GROUP" && <GroupMembers members={selectedChat?.members}/>
                        }
                        <ChatClearBlock id={selectedChat?.id}/>
                        <ChatDeleteBlock id={selectedChat?.id}/>
                    </motion.div>
                </LayoutGroup>
            </AnimatePresence>
        </motion.div>
    )
}

interface InfoProps {
    data: ChatData | null
}

function Info(props: InfoProps) {

    const theme = useAppSelector(selectTheme);
    const username = useAppSelector(selectUsername);

    let isOnline = false;

    if (props.data?.chatType === "DIALOGUE") {
        for (let member of props.data.members) {
            if (member.username !== username && member.status === "ONLINE") isOnline = true;
        }
    }

    return (
        <motion.div layout
                    key={"Info"}
                    animate={{
                        background: theme.colors.client.chatInfo.box.background,
                        borderColor: theme.colors.client.chatInfo.box.border
                    }}
                    className={"Info"}>
            <AnimatePresence>
                <LayoutGroup>
                    <Avatar canUpload={props.data?.chatType == "GROUP"} isOnline={isOnline} size={100} type={props.data?.chatType} avatar={props.data?.avatar}/>
                    <motion.h3 layout
                               animate={{
                                   color: theme.colors.client.chatInfo.box.mainColor
                               }}
                               key={"title"}>{props.data?.title}</motion.h3>
                    <motion.p layout
                              animate={{
                                  color: theme.colors.client.chatInfo.box.secondSection
                              }}
                              key={"description"}>No description</motion.p>
                    <motion.div layout
                                key={"calls"}
                                className={"CallsBox"}>
                        <ButtonWithIcon keyValue={"audio"} defaultStyle={{opacity: 0.3}} icon={theme.media.chatInfo.calls.audio} onClickAction={() => {}}/>
                        <ButtonWithIcon keyValue={"video"} defaultStyle={{opacity: 0.3}} icon={theme.media.chatInfo.calls.video} onClickAction={() => {}}/>
                    </motion.div>
                </LayoutGroup>
            </AnimatePresence>
        </motion.div>
    )
}

interface ChatMediaProps {

}

function ChatMedia(props: ChatMediaProps) {
    return (
        <motion.div layout
                    key={"ChatMedia"}
                    className={"ChatMedia"}>

        </motion.div>
    )
}

interface ChatDocumentsProps {
    documents: DocumentData[] | null | undefined
}

function ChatDocuments(props: ChatDocumentsProps) {

    const theme = useAppSelector(selectTheme);
    const ref = useRef(null);

    if (props.documents != null && props.documents.length > 0) {

        const documentsElements = props.documents.map((doc, i) => {
            return <Document key={i} type={"MESSAGE"} number={i} id={doc.id} name={doc.name} removeItem={() => {}}/>
        })

        return (
            <motion.div layout
                        key={"ChatDocuments"}
                        animate={{
                            background: theme.colors.client.chatInfo.box.background,
                            borderColor: theme.colors.client.chatInfo.box.border
                        }}
                        className={"ChatDocuments"}>
                <motion.h3 animate={{color: theme.colors.textMain}} layout>Documents</motion.h3>
                <motion.div ref={ref} layout className={"DocumentsList"}>
                    <motion.div drag={"x"} dragConstraints={ref}>
                        {documentsElements}
                    </motion.div>
                </motion.div>
            </motion.div>
        )
    } else return null;
}

interface GroupMembersProps {
    members: MemberInfo[] | undefined
}

function GroupMembers(props: GroupMembersProps) {

    const theme = useAppSelector(selectTheme);
    const username = useAppSelector(selectUsername);

    const membersElements = props.members?.map(item => ChatProvider.convertForMemberInfo(item, username)).map(item => {
        return <GroupMember key={item?.username} data={item}/>
    })
    return (
        <motion.div layout
                    key={"GroupMembers"}
                    animate={{
                        background: theme.colors.client.chatInfo.box.background,
                        borderColor: theme.colors.client.chatInfo.box.border
                    }}
                    className={"ChatMembers"}>
            <motion.h3 layout animate={{color: theme.colors.textMain}}>Members</motion.h3>
            <motion.ul layout>
                {membersElements}
            </motion.ul>
        </motion.div>
    )
}

interface GroupMemberProps {
    data: MemberInfo | null
}

function GroupMember(props: GroupMemberProps) {

    const theme = useAppSelector(selectTheme);

    const [isOnline, setOnline] = useState(props.data?.status === "ONLINE");
    const [reset, setReset] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (props.data?.status) {
            if (reset != null) clearTimeout(reset);
            setOnline(true);
        } else {
            setReset(setTimeout(() => {
                setOnline(false)
            }, 5000))
        }
    }, [props.data?.status])

    return (
        <motion.li layout
                   key={props.data?.username}
                   animate={{borderColor: theme.colors.border}}
                   className={"ChatMember"}>
            <Avatar isOnline={props.data?.status === "ONLINE"} type={"DIALOGUE"} avatar={props.data?.avatar} size={60}/>
            <motion.p layout animate={{color: theme.colors.textMain}}>{props.data?.username}</motion.p>
            <ButtonThird icon={theme.media.chatInfo.members.dots} onClickAction={() => {}}/>
        </motion.li>
    )
}

function ChatClearBlock(props: {id: string | null | undefined}) {

    const theme = useAppSelector(selectTheme);
    const jwt = useAppSelector(selectJwt);
    const chats = useAppSelector(selectChats);
    const selectedChatId = useAppSelector(selectSelectedChatId);

    const dispatch = useAppDispatch();

    const clearChat = () => {
        const content = <Accept question={"Clear chat?"} acceptTitle={"Clear"} onAccept={() => {
            return axios.post("https://xmess-gateway-service.jelastic.regruhosting.ru/chats/clearChat", {
                chatId: props.id
            }, {headers: headers}).then(res => {
                if (selectedChatId === res.data) {
                    dispatch(setSelectedChatId(null))
                    dispatch(setInfoOpen(false));
                }
            })
        }}/>
        dispatch(setModalState(true));
        dispatch(setModalContent(content));

    }

    const headers = {
        Authorization: "Bearer " + jwt
    }

    return (
        <motion.div layout
                    key={"ChatClearBlock"}
                    animate={{
                        background: theme.colors.client.chatInfo.box.background,
                        borderColor: theme.colors.client.chatInfo.box.border
                    }}
                    className={"ChatBlock"}>
            <ButtonWithIcon icon={theme.media.clear} onClickAction={clearChat} text={"Clear Chat"}/>
        </motion.div>
    )
}

function ChatDeleteBlock(props: {id: string | null | undefined}) {

    const theme = useAppSelector(selectTheme);
    const jwt = useAppSelector(selectJwt);
    const chats = useAppSelector(selectChats);
    const selectedChatId = useAppSelector(selectSelectedChatId);

    const dispatch = useAppDispatch();

    const headers = {
        Authorization: "Bearer " + jwt
    }

    const deleteChat = () => {
        const content = <Accept question={"Delete chat?"} acceptTitle={"Delete"} onAccept={() => {
            return axios.post("https://xmess-gateway-service.jelastic.regruhosting.ru/chats/deleteChat", {
                chatId: props.id
            }, {headers: headers}).then(res => {
                if (selectedChatId === res.data) dispatch(setSelectedChatId(null))
                dispatch(setChatsData(chats.filter(chat => chat.id !== res.data)))
                dispatch(setInfoOpen(false))
            })
        }}/>
        dispatch(setModalState(true));
        dispatch(setModalContent(content));
    }

    return (
        <motion.div layout
                    key={"ChatClearBlock"}
                    animate={{
                        background: theme.colors.client.chatInfo.box.background,
                        borderColor: theme.colors.client.chatInfo.box.border,
                    }}
                    className={"ChatBlock"}>
            <ButtonWithIcon icon={theme.media.delete} onClickAction={deleteChat} text={"Delete Chat"}/>
        </motion.div>
    )
}


