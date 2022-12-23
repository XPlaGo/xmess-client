import "./Accept.css"
import {motion} from "framer-motion";
import ButtonSimple from "../../button/simple/ButtonSimple";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {setModalContent, setModalState} from "../../../../features/modal/modalSlice";
import ButtonAccent from "../../button/accent/ButtonAccent";
import {useState} from "react";
import "./Accept.css";
import {selectTheme} from "../../../../features/theme/themeSlice";

export interface AcceptProps {
    question: string,
    acceptTitle: string,
    onAccept: Function | Promise<any>
}

export default function Accept(props: AcceptProps) {

    const [isLoading, setLoading] = useState(false);
    const theme = useAppSelector(selectTheme);

    const dispatch = useAppDispatch();

    return (
        <motion.div layout
                    initial={{scale: 0.5, opacity: 0}}
                    animate={{
                        background: theme.colors.modal.content.background,
                        borderColor: theme.colors.modal.content.border,
                        scale: 1,
                        opacity: 1
                    }}
                    className={"Accept"}>
            <motion.h2 animate={{color: theme.colors.textMain}}>{props.question}</motion.h2>
            <ButtonSimple title={"Cancel"} onClickAction={() => {
                dispatch(setModalState(false));
                dispatch(setModalContent(null));
            }}/>
            <ButtonAccent title={props.acceptTitle} onClickAction={async () => {
                if (props.onAccept instanceof Promise) {
                    setLoading(true);
                    (await props.onAccept)().then(() => setLoading(false))
                } else {
                    props.onAccept();
                }
                dispatch(setModalState(false));
                dispatch(setModalContent(null));
            }} isLoading={isLoading}/>
        </motion.div>
    )
}
