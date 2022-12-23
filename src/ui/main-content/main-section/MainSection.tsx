import {motion} from "framer-motion";
import {useAppSelector} from "../../../app/hooks";
import {
    selectChatsPanelState,
    selectContentState,
    selectNavigation
} from "../../../features/navigation/navigationSlice";
import Authorization from "../authorization/Authorization";
import ChatsPanel from "../client/chats-panel/ChatsPanel";
import {selectTheme} from "../../../features/theme/themeSlice";
import useUIType from "../../tools/hooks/useUIType";
import "./MainSection.css";
import SettingsList from "../settings/SettingsList";

export interface MainSectionProps {
    isRefresh: boolean,
}

export default function MainSection(props: MainSectionProps) {

    const navigation = useAppSelector(selectNavigation).content;
    const theme = useAppSelector(selectTheme);
    const chatsState = useAppSelector(selectChatsPanelState);
    const UIType = useUIType();

    let content: JSX.Element | null = <Authorization/>
    if (navigation === "client") content = <ChatsPanel/>
    if (navigation === "settings") content = <SettingsList/>

    if (props.isRefresh) content = null;

    const variants = {
        initial: {
            width: 0,
            maxWidth: 0,
            background: theme.colors.mainSection.background
        },
        auth: {
            width: UIType === "pc" ? window.innerWidth * 0.55 : window.innerWidth,
            maxWidth: UIType === "pc" ? 1000 : window.innerWidth,
            background: theme.colors.mainSection.background
        },
        client: {
            width: (chatsState === "opened" || UIType !== "tablet") ? window.innerWidth : 104,
            maxWidth: UIType === "pc" ? 400 : window.innerWidth,
            background: theme.colors.mainSection.background
        },
        settings: {
            width: (chatsState === "opened" || UIType !== "tablet") ? window.innerWidth : 104,
            maxWidth: UIType === "pc" ? 400 : window.innerWidth,
            background: theme.colors.mainSection.background
        },
        refresh: {
            width: 0,
            maxWidth: 0,
            background: theme.colors.mainSection.background
        }
    }
    return (
        <motion.section layout
                        key={"mainSection"}
                        className={"MainSection " + UIType}
                        initial={"initial"}
                        transition={{
                            type: "easeInOut",
                        }}
                        variants={variants}
                        animate={props.isRefresh ? "refresh" : navigation}>
            <motion.div layout
                        transition={{
                            type: "easeInOut"
                        }}
                        className={"MainSectionBox"}
                        animate={{borderColor: theme.colors.mainSection.box.border}}>
                {content}
            </motion.div>
        </motion.section>
    )
}
