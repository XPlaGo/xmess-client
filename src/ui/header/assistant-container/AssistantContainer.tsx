import { motion } from "framer-motion";
import { useAppSelector } from "../../../app/hooks";
import { selectTheme, Theme } from "../../../features/theme/themeSlice";
import AssistantIcon from "./assistant-icon/AssistantIcon";

import "./AssistantContainer.css";
import useUIType from "../../tools/hooks/useUIType";

export interface AssistantContainerProps {

}

export default function AssistantContainer(props: AssistantContainerProps) {
    const theme: Theme = useAppSelector(selectTheme);
    const UIType = useUIType();
    return (
        <motion.div
            layout
            className={"AssistantContainer " + UIType}
            animate={{
                background: theme.colors.header.sectionBackground,
                borderColor: theme.colors.borderSecond
            }}
            transition={{
                type: "easeInOut",
                background: {duration: 0.2},
                border: {duration: 0.2},
            }}>
                <AssistantIcon/>
        </motion.div>
    )
}
