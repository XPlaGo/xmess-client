import {AnimatePresence, motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    selectAuthType,
    selectContentState,
    selectNavigation,
    setAuthType
} from "../../../features/navigation/navigationSlice";

import RightPanel from "../authorization/right-panel/RightPanel";
import {selectTheme} from "../../../features/theme/themeSlice";
import ChatPanel from "../client/chat-panel/ChatPanel";
import RefreshContent from "../refresh/RefreshContent";
import "./ContentSection.css";
import useUIType from "../../tools/hooks/useUIType";
import SettingsContent from "../settings/content/SettingsContent";

export interface ContentSectionProps {
    isRefresh: boolean
}

export default function ContentSection(props: ContentSectionProps) {
    const navigation = useAppSelector(selectNavigation).content;
    const authType = useAppSelector(selectAuthType);
    const theme = useAppSelector(selectTheme);
    const isContentOpened = useAppSelector(selectContentState);
    const UIType = useUIType();

    const dispatch = useAppDispatch();

    let content = <RightPanel type={authType} setType={(value) => dispatch(setAuthType(value))}/>
    if (navigation === "client") content = <ChatPanel/>
    if (navigation === "settings") content = <SettingsContent/>

    return (
        <motion.section layout
                        key={"contentSection"}
                        className={"ContentSection " + UIType}
                        transition={{
                            type: "easeInOut"
                        }}
                        initial={{
                            background: theme.colors.secondSection.background
                        }}
                        animate={{
                            background: theme.colors.secondSection.background
                        }}>
            <AnimatePresence exitBeforeEnter>
                { isContentOpened || UIType === "pc" || UIType === "tablet" ?
                    (props.isRefresh ? <RefreshContent/> : content) : null
                }
            </AnimatePresence>
        </motion.section>
    )
}
