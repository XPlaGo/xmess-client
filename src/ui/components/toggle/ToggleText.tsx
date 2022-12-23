import {LayoutGroup, motion} from "framer-motion";
import {useState} from "react";
import {useAppSelector} from "../../../app/hooks";
import {selectTheme} from "../../../features/theme/themeSlice";
import "./ToggleText.css";

export interface ToggleTextProps {
    leftTitle: string,
    rightTitle: string,
    toLeft: () => void,
    toRight: () => void
}

export default function ToggleText(props: ToggleTextProps) {

    const [position, setPosition] = useState<"left" | "right">("left");
    const theme = useAppSelector(selectTheme);

    return (
        <motion.div layout
                    animate={{
                        background: theme.colors.toggle.text.background,
                        borderColor: theme.colors.border,
                        color: theme.colors.toggle.text.color
                    }}
                    className={"ToggleText"}>
            <LayoutGroup>
            <motion.div layout
                        onClick={() => {
                            setPosition("left")
                            props.toLeft()
                        }}
                        animate={{
                            background: position === "left" ? theme.colors.toggle.text.box.backgroundActive
                                : theme.colors.toggle.text.box.background,
                            borderColor: position === "left" ? theme.colors.toggle.text.box.borderActive
                                : theme.colors.toggle.text.box.border,
                            color: theme.colors.toggle.text.box.color
                        }}
                        className={"Left"}>
                {props.leftTitle}
            </motion.div>
            <motion.div layout
                        onClick={() => {
                            setPosition("right")
                            props.toRight();
                        }}
                        animate={{
                            background: position === "right" ? theme.colors.toggle.text.box.backgroundActive
                                : theme.colors.toggle.text.box.background,
                            borderColor: position === "right" ? theme.colors.toggle.text.box.borderActive
                                : theme.colors.toggle.text.box.border,
                            color: theme.colors.toggle.text.box.color
                        }}
                        className={"Right"}>
                {props.rightTitle}
            </motion.div>
            </LayoutGroup>
        </motion.div>
    )
}
