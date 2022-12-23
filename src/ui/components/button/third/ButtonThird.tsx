import { motion } from "framer-motion";
import { MouseEvent, useState } from "react";
import { useAppSelector } from "src/app/hooks";
import { selectTheme, Theme } from "src/features/theme/themeSlice";

import "./ButtonThird.css";

export interface ButtonWithIconProps {
    icon: string,
    onClickAction: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void,
    keyValue?: string,
    initialStyle?: any,
    exitStyle?: any,
    defaultStyle?: any,
    defaultIconStyle?: any,
    onHoverStyle?: any,
    onHoverIconStyle?: any,
    onClickStyle?: any,
    onClickIconStyle?: any,
    className?: string | null
}

export default function ButtonThird(props: ButtonWithIconProps) {
    const theme: Theme = useAppSelector(selectTheme);
    const [isHover, setHover] = useState<boolean>(false);
    const [isClick, setClick] = useState<boolean>(false);
    return (
        <motion.button
            type={"button"}
            key={props.keyValue}
            className={"ButtonThird " + (props.className ? props.className : "")}
            onClick={(event) => props.onClickAction(event)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseDown={() => setClick(true)}
            onMouseUp={() => setClick(false)}
            whileHover={{
                background: theme.colors.button.third.backgroundHover,
                scale: 1.1,
                boxShadow: "0 0 10px " + theme.colors.shadowMain,
                ...props.onHoverStyle
            }}
            whileTap={{
                scale: 0.9,
                ...props.onClickStyle
            }}
            initial={{
                background: theme.colors.button.third.background,
                ...props.defaultStyle,
                ...props.initialStyle
            }}
            animate={{
                background: theme.colors.button.third.background,
                ...props.defaultStyle
            }}
            exit={{
                ...props.exitStyle
            }}
            layout>
            <motion.img
                src={props.icon}
                style={{...props.defaultIconStyle}}
                animate={isClick ? props.onClickIconStyle : isHover ? props.onHoverIconStyle : {}}
                layout/>
        </motion.button>
    )
}
