import "./ChatPanel.css";
import {selectTheme, Theme} from "../../../../features/theme/themeSlice";
import {useAppSelector} from "../../../../app/hooks";
import {AnimatePresence, motion} from "framer-motion";
import {StompSessionProvider} from "react-stomp-hooks";
import {selectAuth} from "../../../../features/auth/authSlice";
import {selectSelectedChatId} from "../../../../features/chat/chatSlice";
import EmptyChatPanel from "./empty-chat-panel/EmptyChatPanel";
import ChatHeader from "./chat-header/ChatHeader";
import ChatList from "./chat-list/ChatList";
import ChatInput from "./chat-input/ChatInput";

export interface ChatPanelProps {

}

export default function ChatPanel(props: ChatPanelProps) {
    const theme: Theme = useAppSelector(selectTheme);
    const selectedChatId = useAppSelector(selectSelectedChatId);
    const jwt = useAppSelector(selectAuth).jwtToken;
    const headers = {
        Authorization: `Bearer ${jwt}`
    }
    return (
        <motion.div
            key={"chatPanel"}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            animate={{
                background: theme.colors.client.chat.background,
                opacity: 1
            }}
            className={"ChatPanel"}>
            <AnimatePresence exitBeforeEnter>{
                selectedChatId == null ? <EmptyChatPanel/> :
                    <motion.div layout
                                key={"chatPanel"}
                                initial={{
                                    opacity: 0
                                }}
                                transition={{
                                    type: "easeInOut",
                                    when: "beforeChildren",
                                    staggerChildren: 0.3
                                }}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className={"chatsBox"}>
                            <ChatHeader/>
                            <ChatList/>
                            <ChatInput/>
                    </motion.div>
            }</AnimatePresence>
        </motion.div>
    )
}

