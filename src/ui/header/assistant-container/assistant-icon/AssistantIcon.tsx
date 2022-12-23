import { motion } from "framer-motion";
import { useState } from "react";
import {useAppDispatch, useAppSelector} from "src/app/hooks";
import { selectTheme } from "src/features/theme/themeSlice";

import "./AssistantIcon.css";
import useUIType from "../../../tools/hooks/useUIType";
import {selectIsListening, setAssistantListening} from "../../../../features/assistant/assistantSlice";

export interface AssistantIconProps {

}

export default function AssistantIcon(props: AssistantIconProps) {

    const theme = useAppSelector(selectTheme);
    const UIType = useUIType();

    const isListening = useAppSelector(selectIsListening);

    const dispatch = useAppDispatch();

    let variants: any = {
        coloredDisabled: {
            background: theme.colors.assistant.icon.background
        },
        coloredActive: {
            background: theme.colors.assistant.icon.activeBackground,
            boxShadow: "0 5px 10px " + theme.colors.assistant.icon.shadow
        },
        borderDisabled: {
            borderColor: theme.colors.assistant.icon.background
        },
        borderActive: {
            borderColor: theme.colors.assistant.icon.activeBackground,
            boxShadow: `0 5px 10px ${theme.colors.assistant.icon.shadow}, inset 0 5px 10px ${theme.colors.assistant.icon.shadow}`
        },
    }
    return (
        <motion.div
            variants={variants}
            onClick={() => dispatch(setAssistantListening(!isListening))}
            animate={isListening ? "borderActive" : "borderDisabled"}
            className={"AssistantIcon border " + UIType}>
                <motion.div
                    variants={variants}
                    animate={isListening ? "coloredActive" : "coloredDisabled"}
                    className="inner">
                </motion.div>
        </motion.div>
    )
}
