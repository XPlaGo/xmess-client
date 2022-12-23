import { motion } from "framer-motion";
import { useAppSelector } from "src/app/hooks";
import { selectTheme } from "src/features/theme/themeSlice";

import "./InputText.css";

export interface InputTextProps {
    placeholder: string,
    value: string,
    type: string,
    setValue: (value: string) => void,
    onChange?: (event: any) => void
}

export default function InputText(props: InputTextProps) {
    const theme = useAppSelector(selectTheme);
    return (
        <motion.input
            layout
            value={props.value}
            className="InputText"
            placeholder={props.placeholder}
            onChange={(event) => {
                props.setValue(event.target.value);
                if (props.onChange) props.onChange(event)
            }}
            type={props.type}
            transition={{
                type: "easeInOut",
                background: {duration: 0.2},
                border: {duration: 0.2},
                color: {duration: 0.2},
            }}
            initial={{
                background: theme.colors.input.text.background,
                color: theme.colors.input.text.color,
                borderColor: theme.colors.border
            }}
            animate={{
                background: theme.colors.input.text.background,
                color: theme.colors.input.text.color,
                borderColor: theme.colors.border
            }}/>
    )
}
