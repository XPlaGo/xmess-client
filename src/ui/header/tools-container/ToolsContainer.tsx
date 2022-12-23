import { motion } from "framer-motion"
import ToggleWithIcon from "src/ui/components/toggle/ToggleWithIcon";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectTheme, setDark, setLight, Theme } from "../../../features/theme/themeSlice";
import ButtonWithIcon from "../../components/button/with-icon/ButtonWithIcon";
import SettingsDark from "../../img/SettingsDark.png";
import SettingsLight from "../../img/SettingsLight.png";

import "./ToolsContainer.css";
import useUIType from "../../tools/hooks/useUIType";
import {setInfoOpen, setSettingsNav} from "../../../features/navigation/navigationSlice";
import {setSelectedChatId} from "../../../features/chat/chatSlice";

export interface ToolsContainerProps {

}

export default function ToolsContainer(props: ToolsContainerProps) {
    const theme: Theme = useAppSelector(selectTheme);
    const UIType = useUIType();
    const dispatch = useAppDispatch();
    return (
        <motion.div
            className={"ToolsContainer " + UIType}
            animate={{
                background: theme.colors.header.sectionBackground,
                borderColor: theme.colors.borderSecond
                }}
            transition={{
                type: "easeInOut",
                background: {duration: 0.2},
                border: {duration: 0.2},
            }}>
            {
                UIType != "mobile" && <ToggleWithIcon
                    type={UIType === "pc" ? "vertical" : "horizontal"}
                    icon1={theme.media.toggle["ThemeDark"]}
                    icon2={theme.media.toggle["ThemeLight"]}
                    toggleAction={(event, position) => {
                        if (position === 1) {
                            dispatch(setLight())
                        } else {
                            dispatch(setDark())
                        }
                    }}
                    defaultStyle={UIType == "pc" ? {marginBottom: 7.5} : {marginRight: 7.5}}/>
            }
            <ButtonWithIcon
                onClickAction={(event) => {
                    dispatch(setSettingsNav())
                    dispatch(setInfoOpen(false))
                    dispatch(setSelectedChatId(null))
                }}
                onHoverIconStyle={{rotate: 45}}
                defaultStyle={UIType == "pc" ? {marginTop: 7.5} : UIType == "tablet" ? {marginLeft: 7.5} : {}}
                icon={theme.media["SettingsIcon"]}/>
        </motion.div>
    )
}
