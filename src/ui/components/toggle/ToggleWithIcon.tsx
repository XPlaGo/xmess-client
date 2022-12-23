import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectTheme, Theme } from "../../../features/theme/themeSlice";

import "./ToggleWithIcon.css";

export interface ToggleWithIconProps {
    icon1: string,
    icon2: string,
    type: "vertical" | "horizontal",
    toggleAction: (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, position: 1 | 2) => void,
    defaultStyle?: any,
    defaultIconStyle?: any,
    onHoverStyle?: any,
    onHoverIconStyle?: any,
    onClickStyle?: any,
    onClickIconStyle?: any,
}

export default function ToggleWithIcon(props: ToggleWithIconProps) {
    const theme: Theme = useAppSelector(selectTheme);
    const [position, setPosition] = useState<1 | 2>(theme.name == "DefaultDark" ? 1 : 2);
    const [icon, setIcon] = useState(theme.name == "DefaultDark" ? props.icon1 : props.icon2);
    const [isHover, setHover] = useState<boolean>(false);
    const [isClick, setClick] = useState<boolean>(false);
    return (
        <motion.div
            className={"ToggleWithIcon " + props.type}
            onClick={(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
                if (position === 1) {
                    props.toggleAction(event, 1);
                    setPosition(2);
                    setIcon(props.icon2);
                } else if (position == 2) {
                    props.toggleAction(event, 2);
                    setPosition(1);
                    setIcon(props.icon1);
                }
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseDown={() => setClick(true)}
            onMouseUp={() => setClick(false)}
            animate={{
                background: theme.colors.toggle["toggleWithIconBackground"],
                borderColor: theme.colors["border"],
                ...props.defaultStyle}}>
            <motion.div
                layout
                transition={{
                    type: "easeInOut",
                    duration: 0.2
                }}
                animate={{
                    background: theme.colors.toggle["toggleWithIconBoxBackground"],
                    borderColor: theme.colors["border"],
                    boxShadow: "0 0 10px " + theme.colors["shadowMain"],
                    ...(props.type == "vertical" ? (
                        position == 1 ? {top: 2} : {top: 26}
                    ) : (
                        position == 1 ? {left: 2} : {left: 26}
                    ))
                }}>
                <AnimatePresence exitBeforeEnter>
                    <motion.img src={icon}/>
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}
