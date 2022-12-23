import { motion } from "framer-motion"
import { MiniLogo } from "src/ui/components/logo/Logo";
import { useAppSelector } from "../../../app/hooks";
import { selectTheme, Theme } from "../../../features/theme/themeSlice";

import "./HeaderLogoContainer.css";
import useUIType from "../../tools/hooks/useUIType";

export interface HeaderLogoContainerProps {

}

export default function HeaderLogoContainer(props: HeaderLogoContainerProps) {
    const theme: Theme = useAppSelector(selectTheme);
    const UIType = useUIType();
    return (
        <motion.div
            className={"HeaderLogoContainer " + UIType}
            animate={{
                background: theme.colors.header.sectionBackground,
                borderColor: theme.colors.borderSecond
                }}
            transition={{
                type: "easeInOut",
                background: {duration: 0.2},
                border: {duration: 0.2},
            }}>
            <HeaderLogo/>
        </motion.div>
    )
}

function HeaderLogo() {
    return (
        <motion.div>
            <MiniLogo size={window.innerWidth <= 380 ? 46 : 50} animationDelay={0}/>
        </motion.div>
    )
}
