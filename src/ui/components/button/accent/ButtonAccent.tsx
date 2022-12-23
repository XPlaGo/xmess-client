import {AnimatePresence, motion} from "framer-motion";
import { useAppSelector } from "src/app/hooks";
import { selectTheme } from "src/features/theme/themeSlice";

import "./ButtonAccent.css";
import React from "react";
import LoaderSimple from "../../loader/LoaderSimple";

export interface ButtonAccentProps {
    title: string,
    onClickAction: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    isLoading: boolean,
}

export default function ButtonAccent(props: ButtonAccentProps) {
    const theme = useAppSelector(selectTheme);
    return (
        <motion.button
            layout
            className="ButtonAccent"
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            animate={{
                boxShadow: "0 5px 20px " + theme.colors.button.accent.shadow,
                background: theme.colors.button.accent.background,
                color: theme.colors.button.accent.color
            }}
            onClick={(event) => props.onClickAction(event)}>
            <AnimatePresence exitBeforeEnter>
                {props.isLoading ? <LoaderSimple color={"#ffffff"} key={"notLoading"}/> : <motion.p initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}} key={"loading"} layout>{props.title}</motion.p>}
            </AnimatePresence>
        </motion.button>
    )
}
