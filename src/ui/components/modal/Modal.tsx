import {motion} from "framer-motion";
import {ReactNode} from "react";
import {useAppSelector} from "../../../app/hooks";
import {selectModalContent} from "../../../features/modal/modalSlice";
import "./Modal.css";

export interface ModalProps {
}

export default function Modal(props: ModalProps) {
    const content = useAppSelector(selectModalContent)
    return (
        <motion.div
            className={"Modal"}
            layout>
            {content}
        </motion.div>
    )
}
