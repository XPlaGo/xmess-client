import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectAuthType, selectNavigation} from "../../../features/navigation/navigationSlice";
import {selectTheme} from "../../../features/theme/themeSlice";
import InfoPanel from "../client/info-panel/InfoPanel";
import "./InfoSection.css";

export default function InfoSection() {
    const navigation = useAppSelector(selectNavigation).content;
    const theme = useAppSelector(selectTheme);

    const dispatch = useAppDispatch();

    let content = null;
    if (navigation === "client") content = <InfoPanel/>
    return (
        <motion.section layout
                        key={"infoSection"}
                        initial={{x: 100}}
                        exit={{x: 100}}
                        animate={{
                            borderColor: theme.colors.infoSection.border,
                            background: theme.colors.infoSection.background,
                            x: 0
                        }}
                        transition={{type: "easeInOut"}}
                        className={"InfoSection"}>
                {content}
        </motion.section>
    )
}
