import {useState} from "react";
import {useAppSelector} from "../../../app/hooks";
import {selectTheme} from "../../../features/theme/themeSlice";
import {motion} from "framer-motion";
import "./Check.css";

export default function Check(props: {
    onOn: () => void,
    onOff: () => void
}) {
    const theme = useAppSelector(selectTheme);
    const [isCheck, setCheck] = useState(false);
    return (
        <motion.div layout
                    onClick={() => {
                        if (isCheck) {
                            setCheck(false);
                            props.onOff();
                        } else {
                            setCheck(true);
                            props.onOn();
                        }
                    }}
                    animate={{
                        background: theme.colors.check.background,
                        borderColor: theme.colors.border
                    }}
                    className={"Check"}>
            {
                isCheck && <motion.img src={theme.media.check}/>
            }
        </motion.div>
    )
}
