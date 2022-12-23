import {AnimatePresence, LayoutGroup, motion, useAnimation} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {ChatData, selectSelectedChat, setSelectedChatId} from "../../../../../features/chat/chatSlice";
import InputText from "../../../../components/input/text/InputText";
import ButtonWithIcon from "../../../../components/button/with-icon/ButtonWithIcon";
import {selectTheme} from "../../../../../features/theme/themeSlice";
import "./ChatHeader.css";
import {selectUsername} from "../../../../../features/auth/authSlice";
import {useState} from "react";
import {ChatProvider} from "../../../../tools/ChatProvider";
import Avatar from "../../../../components/avatar/Avatar";
import useUIType from "../../../../tools/hooks/useUIType";
import ButtonThird from "../../../../components/button/third/ButtonThird";
import {setChatsOpened, setContentOpen} from "../../../../../features/navigation/navigationSlice";

export interface ChatHeaderProps {

}

export default function ChatHeader(props: ChatHeaderProps) {

    const theme = useAppSelector(selectTheme);
    const username = useAppSelector(selectUsername);
    const selectedChat = useAppSelector(selectSelectedChat);
    const UIType = useUIType();

    const dispatch = useAppDispatch();

    let isOnline = false;

    if (selectedChat?.chatType === "DIALOGUE") {
        for (let member of selectedChat.members) {
            if (member.username !== username && member.status === "ONLINE") isOnline = true;
        }
    }

    return (
        <motion.div layout
                    initial={{y: -100, opacity: 0,}}
                    exit={{y: -100, opacity: 0, transition: {when: "afterChildren"}}}
                    animate={{borderColor: theme.colors.client.chat.header.border, y: 0, opacity: 1}}
                    key={"chatHeader"}
                    transition={{type: "easeInOut"}}
                    className={"ChatHeader"}>
            { UIType === "mobile" &&
                <ButtonThird icon={theme.media.arrowLeft} onClickAction={() => {
                    dispatch(setSelectedChatId(null))
                    dispatch(setContentOpen(false))
                    dispatch(setChatsOpened())
                }}/>
            }
            <motion.div layout
                        key={"chatInfo"}
                        className={"ChatInfo"}>
                <LayoutGroup>
                    <Avatar isOnline={isOnline} type={selectedChat?.chatType} avatar={ChatProvider.convertAvatar(selectedChat, username)} size={60}/>
                    <motion.p
                              key={"chatTitle"}
                              animate={{color: theme.colors.client.chat.header.titleColor}}
                              className={"ChatTitle"}>
                        {ChatProvider.convertTitle(selectedChat, username)}
                    </motion.p>
                </LayoutGroup>
            </motion.div>
            <motion.div layout
                        key={"chatControl"}
                        className={"ChatControl"}>
                { UIType !== "mobile" ?
                    <InputText placeholder={"Search in chat"} value={""} type={"text"} setValue={() => {}}/> :
                    <ButtonWithIcon icon={theme.colors.client.chat.header.dots} onClickAction={() => {}}/>
                }
            </motion.div>
        </motion.div>
    )
}
