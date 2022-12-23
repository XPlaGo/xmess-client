import { motion } from "framer-motion";
import { useAppSelector } from "src/app/hooks";
import { selectTheme } from "src/features/theme/themeSlice";

import "./ButtonSimple.css";

export interface ButtonSimpleProps {
    title: string,
    onClickAction: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    defaultStyle?: any,
    defaultTextStyle?: any
}

export default function ButtonSimple(props: ButtonSimpleProps) {
    const theme = useAppSelector(selectTheme);
    return (
        <motion.button
            layout
            className="ButtonSimple"
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            style={{
                boxShadow: "0 5px 20px " + theme.colors.button.simple.shadow,
                background: theme.colors.button.simple.background,
                color: theme.colors.button.simple.color,
                borderColor: theme.colors.border,
                ...props.defaultStyle
            }}
            onClick={(event) => props.onClickAction(event)}>
                <span style={{...props.defaultTextStyle}}>{props.title}</span>
        </motion.button>
    )
}
