import {AnimLogo} from "../../../../components/logo/Logo";
import {motion} from "framer-motion";
import {useAppSelector} from "../../../../../app/hooks";
import {selectTheme} from "../../../../../features/theme/themeSlice";
import "./AboutSection.css";

export default function AboutSection() {
    const theme = useAppSelector(selectTheme);
    return (
        <motion.div layout className={"AboutSection"}>
            <AnimLogo size={200} animationDelay={0}/>
            <motion.h2 layout animate={{color: theme.colors.textMain}}>XMess</motion.h2>
            <motion.p layout animate={{color: theme.colors.textSecond}}>Developed by <motion.a href={"http://github.com/xplago"} target="_blank" layout animate={{color: theme.colors.textMain}}>xplago</motion.a>
            </motion.p>
        </motion.div>
    )
}
