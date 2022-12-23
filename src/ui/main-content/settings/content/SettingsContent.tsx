import {selectTheme, Theme} from "../../../../features/theme/themeSlice";
import {useAppSelector} from "../../../../app/hooks";
import {selectSelectedChatId} from "../../../../features/chat/chatSlice";
import {selectAuth} from "../../../../features/auth/authSlice";
import {AnimatePresence, motion} from "framer-motion";
import "./SettingsContent.css";
import {selectSettingsSection} from "../../../../features/navigation/navigationSlice";
import AboutSection from "./about/AboutSection";
import Profile from "./profile/Profile";

export interface SettingsContentProps {

}

export default function SettingsContent(props: SettingsContentProps) {
    const theme: Theme = useAppSelector(selectTheme);
    const jwt = useAppSelector(selectAuth).jwtToken;
    const settingsSection = useAppSelector(selectSettingsSection)

    let content: any = null;
    if (settingsSection === "about") content = <AboutSection/>
    if (settingsSection === "profile") content = <Profile/>

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
            className={"SettingsContent"}>
            <AnimatePresence exitBeforeEnter>{
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
                                className={"SettingsContentBox"}>
                        {content}
                    </motion.div>
            }</AnimatePresence>
        </motion.div>
    )
}
