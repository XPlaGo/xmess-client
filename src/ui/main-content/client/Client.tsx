import ChatsPanel from "./chats-panel/ChatsPanel";
import ChatPanel from "./chat-panel/ChatPanel";
import {Fragment} from "react";
import InfoPanel from "./info-panel/InfoPanel";
import {motion} from "framer-motion";
import "./Client.css"

export interface ClientProps {

}

export default function Client(props: ClientProps) {
    return (
        <motion.div className={"Client"}>
        </motion.div>
    )
}
