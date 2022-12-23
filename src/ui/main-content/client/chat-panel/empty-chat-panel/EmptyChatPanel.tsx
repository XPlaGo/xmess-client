import {motion} from "framer-motion";
import {useAppSelector} from "../../../../../app/hooks";
import {selectTheme} from "../../../../../features/theme/themeSlice";
import "./EmptyChatPanel.css";
import {AnimLogo, MiniLogo} from "../../../../components/logo/Logo";

export default function EmptyChatPanel() {
    const theme = useAppSelector(selectTheme);
    return (
        <motion.div layout
                    key={"emptyPanel"}
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: -100}}
                    transition={{
                        type: "easeInOut"
                    }}
                    className={"EmptyChatPanel"}>
            <motion.div animate={{
                background: theme.colors.client.chat.empty.background,
                borderColor: theme.colors.client.chat.empty.border,
            }}>
                <MiniLogo size={200} animationDelay={0}/>
                <motion.p animate={{color: theme.colors.client.chat.empty.color}}>Open the chat</motion.p>
            </motion.div>
        </motion.div>
    )
}
