import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectJwt, selectUsername} from "../../../features/auth/authSlice";
import {
    selectChatsPanelState, selectSettingsSection,
    setChatsClosed,
    setChatsOpened, setClientNav,
    setContentOpen, setInfoOpen, setNavigation, setSettingsSection
} from "../../../features/navigation/navigationSlice";
import React, {Fragment, useState} from "react";
import useUIType from "../../tools/hooks/useUIType";
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import {selectTheme, Theme} from "../../../features/theme/themeSlice";
import {
    ChatData,
    MemberInfo,
    selectChats,
    selectSelectedChatId,
    setChatMemberAvatar,
    setChatsData, setSelectedChatId, updateChat
} from "../../../features/chat/chatSlice";
import {AvatarService} from "../../../service/auth/AvatarService";
import {useSubscription} from "react-stomp-hooks";
import axios from "axios";
import {ChatProvider} from "../../tools/ChatProvider";
import ChatItem from "../client/chats-panel/chat-item/ChatItem";
import "./SettingsList.css";
import ButtonWithIcon from "../../components/button/with-icon/ButtonWithIcon";
import ButtonThird from "../../components/button/third/ButtonThird";
import Avatar from "../../components/avatar/Avatar";

export interface ChatsPanelProps {
}

export default function SettingsList(props: ChatsPanelProps) {

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
                    className={`SettingsList ${chatsState} ${UIType}`}>
            <Settings/>
        </motion.div>
    )
}

function Settings(
) {

    const theme: Theme = useAppSelector(selectTheme);
    const username = useAppSelector(selectUsername);
    const chatsState = useAppSelector(selectChatsPanelState);
    const jwt = useAppSelector(selectJwt);
    const UIType = useUIType();

    const dispatch = useAppDispatch();

    const headers = {
        Authorization: "Bearer " + jwt
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
                                animate={{color: theme.colors.client.chats.header.h2.color, opacity: 1}}>
                                Settings
                            </motion.h2>
                            <ButtonThird icon={theme.media.closeGlobal} onClickAction={() => {
                                dispatch(setClientNav())
                            }}/>
                        </>
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
                        <SettingsSectionLink icon={theme.media.dialogue.noAvatar} title={"Profile"} section={"profile"}/>
                        <SettingsSectionLink icon={theme.media.info} title={"About"} section={"about"}/>
                    </motion.ul>
                </motion.div>
            </LayoutGroup>
        </motion.div>
    )
}

interface SettingsSectionLinkProps {
    title: string,
    section: "about" | "profile",
    icon: any
}

function SettingsSectionLink(props: SettingsSectionLinkProps) {

    const theme: Theme = useAppSelector(selectTheme);
    const settingsSection = useAppSelector(selectSettingsSection);
    const chatsState = useAppSelector(selectChatsPanelState);
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

    return (
        <motion.li
            onClick={() => {
                dispatch(setContentOpen(true))
                dispatch(setSettingsSection(props.section))
            }}
            layout
            transition={{
                type: "easeInOut"
            }}
            key={String(props.section)}
            className={`SettingsSectionLink ${UIType}`}
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
                animate={settingsSection === props.section ? "active" : "default"}
                transition={{
                    type: "easeInOut"
                }}
                variants={variantsChatItem}
                className={"sectionListBox"}>
                <img src={props.icon}/>
                <motion.p layout animate={{color: theme.colors.textSecond}}>{props.title}</motion.p>
            </motion.div>
        </motion.li>
    )
}
