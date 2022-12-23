import {motion} from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import { selectTheme, Theme } from "../../features/theme/themeSlice";
import AssistantContainer from "./assistant-container/AssistantContainer";
import HeaderLogoContainer from "./header-logo/HeaderLogoContainer";
import ToolsContainer from "./tools-container/ToolsContainer";

import "./Header.css";
import useUIType from "../tools/hooks/useUIType";
import {selectUsername} from "../../features/auth/authSlice";
import ProfileContainer from "./profile-container/ProfileContainer";

export interface HeaderProps {

}

export default function Header(props: HeaderProps) {
    const theme: Theme = useAppSelector(selectTheme);
    const username = useAppSelector(selectUsername);
    const UIType = useUIType()
    return (
        <motion.header
            layout
            className={"MainHeader " + UIType}
            initial={UIType === "pc" ? {} : {
                y: 200
            }}
            exit={UIType === "pc" ? {} : {
                y: 200
            }}
            key={"mainHeader"}
            animate={{background: theme.colors.header["background"], y: 0}}
            transition={{type: "easeInOut", background: {duration: 0.2}}}>
            <HeaderLogoContainer/>
            <AssistantContainer/>
            {username && UIType !== "mobile" && <ProfileContainer/>}
            <ToolsContainer/>
        </motion.header>
    );
}
