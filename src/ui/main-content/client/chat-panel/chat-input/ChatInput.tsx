import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import InputText from "../../../../components/input/text/InputText";
import ButtonWithIcon from "../../../../components/button/with-icon/ButtonWithIcon";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {selectTheme} from "../../../../../features/theme/themeSlice";
import "./ChatInput.css";
import React, {ChangeEvent, useRef, useState} from "react";
import {useStompClient} from "react-stomp-hooks";
import {selectSelectedChat} from "../../../../../features/chat/chatSlice";
import {selectJwt} from "../../../../../features/auth/authSlice";
import Document from "../../../../components/document/Document";
import axios from "axios";
import {
    selectMessageInputDocuments,
    selectMessageInputText, setMessageInputDocuments,
    setMessageInputText
} from "../../../../../features/message-input/MessageInputSlice";
import {DocumentData} from "../chat-list/message/ChatMessage";

export interface ChatInputProps {

}

export default function ChatInput(props: ChatInputProps) {

    const theme = useAppSelector(selectTheme);
    const selectedChat = useAppSelector(selectSelectedChat);
    const jwt = useAppSelector(selectJwt);

    const [isLoading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const inputValue = useAppSelector(selectMessageInputText);
    const setInputValue = (value: string) => dispatch(setMessageInputText(value))
    const documents = useAppSelector(selectMessageInputDocuments);
    const setDocuments = (value: {id: number, file: File}[]) => dispatch(setMessageInputDocuments(value))

    const filesInputRef: any = useRef(null);

    const handleFilesAction = (event: any) => {
        event.preventDefault();
        filesInputRef.current.click()
    }

    const handleFilesUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const newDocuments = [];
        if (event.target.files != null)
            for (let i = 0; i < event.target.files.length; i++) {
                const file = event.target.files[i];
                newDocuments.push({file: file, id: i});
            }
        console.log(newDocuments);
        setDocuments(newDocuments);
    }

    const ref = useRef(null);

    const stompClient = useStompClient();

    const handleSend = async (event: any) => {
        event.preventDefault();
        if (stompClient && (inputValue !== "" || (documents.length > 0 || inputValue !== "")) && selectedChat) {
            const documentsId = [];
            setLoading(true);
            for (let document of documents) {
                let formData = new FormData();
                formData.append("file", document.file)
                let response = await axios.post(
                    "https://xmess-gateway-service.jelastic.regruhosting.ru/document/uploadWithMessage",
                    formData,
                    {
                        headers: {
                            Authorization: "Bearer " + jwt,
                            "Content-Type": "multipart/form-data",
                            chatId: selectedChat.id
                        }
                    }
                )
                documentsId.push(response.data)
            }
            stompClient.publish({
                body: JSON.stringify({
                    chatId: selectedChat.id,
                    textContent: inputValue,
                    time: new Date(),
                    documents: documentsId
                }),
                destination: "/app/send",
                headers: {
                    Authorization: "Bearer " + jwt
                }
            })
            setLoading(false);
            setDocuments([])
            setInputValue("");
        }
    }

    const removeDocument = (i: number) => {
        setDocuments(documents.filter(doc => i !== doc.id))
    }

    const documentsElements = documents.map((doc) => {
        return <Document
            key={doc.id}
            id={null}
            isLoading={isLoading}
            type={"INPUT"}
            number={doc.id}
            removeItem={() => {removeDocument(doc.id)}}
            name={doc.file.name}/>
    })

    return (
        <motion.form layout
                     initial={{y: 100}}
                     exit={{y: 100}}
                     animate={{
                         borderColor: theme.colors.client.chat.header.border, y: 0,
                     }}
                     className={"ChatInput"}>
            <motion.div layout
                        animate={{
                            borderColor: theme.colors.client.chat.input.inputBox.border,
                            background: theme.colors.client.chat.input.inputBox.backgroundActive,
                            //height: documentsElements.length > 0 ? 192 : 72
                        }}
                        className={"InputBox"}>
                <LayoutGroup>
                    <motion.div key={"docs"}
                                ref={ref}
                                initial={{opacity: 0}}
                                style={{
                                    //paddingBottom: documents.length > 0 ? (window.innerWidth <= 380 ? 5 : 10) : 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    height: documents.length > 0 ? (window.innerWidth <= 380 ? 90 : 130) : 0,
                                }}
                                exit={{opacity: 0}}
                                layout
                                className={"documentsBox"}>
                        <motion.div layout drag={"x"} dragConstraints={ref}>
                            <AnimatePresence>
                                {documentsElements}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                    <InputText placeholder={"Type a message"} value={inputValue} type={"text"} setValue={setInputValue}/>
                </LayoutGroup>
            </motion.div>
            <input style={{display: "none"}} type={"file"} multiple ref={filesInputRef} onChange={handleFilesUpload}/>
            <ButtonWithIcon className={"Files"} icon={theme.colors.client.chat.input.files} onClickAction={handleFilesAction}/>
            <ButtonWithIcon className={"Plane"} icon={theme.colors.client.chat.input.plane}
                            onClickAction={handleSend}
                            defaultStyle={{
                                boxShadow: "0 5px 20px " + theme.colors.button.accent.shadow,
                                borderColor: theme.colors.button.accent.background,
                                background: theme.colors.button.accent.background,
                            }}
                            isLoading={isLoading}
                            onClickStyle={{
                                boxShadow: "0 5px 20px " + theme.colors.button.accent.shadow,
                            }}
                            onHoverStyle={{
                                boxShadow: "0 5px 20px " + theme.colors.button.accent.shadow,
                            }}
                            type={"submit"}/>
        </motion.form>
    )
}
