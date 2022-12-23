import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectTheme, setDark, setLight, Theme } from "../../../features/theme/themeSlice";
import ButtonWithIcon from "../../components/button/with-icon/ButtonWithIcon";
import "./ProfileContainer.css";

import useUIType from "../../tools/hooks/useUIType";
import Avatar from "../../components/avatar/Avatar";
import {selectProfile} from "../../../features/auth/authSlice";
import {setInfoOpen, setSettingsNav, setSettingsSection} from "../../../features/navigation/navigationSlice";
import {setSelectedChatId} from "../../../features/chat/chatSlice";

export interface ToolsContainerProps {

}

export default function ProfileContainer(props: ToolsContainerProps) {
    const theme: Theme = useAppSelector(selectTheme);
    const UIType = useUIType();
    const profile = useAppSelector(selectProfile);
    const dispatch = useAppDispatch();
    return (
        <motion.div
            className={"ProfileContainer " + UIType}
            animate={{
                background: theme.colors.header.sectionBackground,
                borderColor: theme.colors.borderSecond
            }}
            onClick={() => {
                dispatch(setSettingsNav())
                dispatch(setInfoOpen(false))
                dispatch(setSelectedChatId(null))
                dispatch(setSettingsSection("profile"))
            }}
            transition={{
                type: "easeInOut",
                background: {duration: 0.2},
                border: {duration: 0.2},
            }}>
            {
                UIType != "mobile" && <Avatar type={"USER"} avatar={profile.avatar} size={60} isOnline={false}/>
            }
        </motion.div>
    )
}
