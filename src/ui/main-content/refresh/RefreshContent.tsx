import LoaderSimple from "../../components/loader/LoaderSimple";
import {motion} from "framer-motion";
import {useAppSelector} from "../../../app/hooks";
import {selectTheme} from "../../../features/theme/themeSlice";
import "./RefreshContent.css";

export default function RefreshContent() {
    const theme = useAppSelector(selectTheme);
    return (
        <motion.div
            key={"refreshContent"}
            className={"RefreshContent"}
            initial={{opacity: 1, y: 0}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 200}}
            transition={{
                type: "easeInOut"
            }}
            layout>
            <motion.h2
                animate={{
                    color: theme.colors.refresh.color
                }}
                layout>Refresh</motion.h2>
            <LoaderSimple/>
        </motion.div>
    )
}
