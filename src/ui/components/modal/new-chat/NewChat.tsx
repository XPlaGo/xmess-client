import {LayoutGroup, motion} from "framer-motion";
import "./NewChat.css";
import ToggleText from "../../toggle/ToggleText";
import React, {useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectTheme} from "../../../../features/theme/themeSlice";
import InputText from "../../input/text/InputText";
import {ChatData, MemberInfo, selectChats} from "../../../../features/chat/chatSlice";
import {selectJwt} from "../../../../features/auth/authSlice";
import Avatar from "../../avatar/Avatar";
import ButtonThird from "../../button/third/ButtonThird";
import axios from "axios";
import {setModalContent, setModalState} from "../../../../features/modal/modalSlice";
import {GlobalSearch} from "../../../main-content/client/chats-panel/ChatsPanel";
import ButtonSimple from "../../button/simple/ButtonSimple";
import ButtonAccent from "../../button/accent/ButtonAccent";

export default function NewChat() {

    const theme = useAppSelector(selectTheme);

    const [type, setType] = useState<"dialogue" | "group">("dialogue");
    return (
        <motion.div layout
                    animate={{
                        background: theme.colors.modal.content.background,
                        borderColor: theme.colors.modal.content.border,
                    }}
                    className={"NewChat"}>
            <LayoutGroup>
                <motion.h2
                    animate={{
                        color: theme.colors.modal.content.mainColor,
                    }}
                    layout>New Chat</motion.h2>
                <ToggleText
                    leftTitle={"Dialogue"}
                    rightTitle={"Group"}
                    toLeft={() => {
                        setType("dialogue")
                        console.log("d")
                    }}
                    toRight={() => {
                        setType("group")
                        console.log("g")
                    }}/>
                {
                    type === "dialogue" ? <NewDialogue/> : <NewGroup/>
                }
            </LayoutGroup>
        </motion.div>
    )
}

function NewDialogue() {

    const [searchText, setSearchText] = useState<string>("")
    const [searchData, setSearchData] = useState<MemberInfo[]>([])
    const jwt = useAppSelector(selectJwt);
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();

    const headers = {
        Authorization: "Bearer " + jwt
    }

    const searchHandler = (event: any) => {
        if (event.target.value.length <= 3) setSearchData([]);
        else axios.post("https://xmess-gateway-service.jelastic.regruhosting.ru/chats/searchUsersGlobal", {part: event.target.value}, {headers: headers})
            .then((res) => {
                if (res.data instanceof Array<any>)
                    setSearchData(res.data);
            })
    }

    return (
        <motion.div className={"dialogue"} animate={{borderColor: theme.colors.border}} layout>
            <InputText placeholder={"Search user"} value={searchText} type={"text"} onChange={searchHandler} setValue={setSearchText}/>
            <GlobalSearch addUser={() => {}} removeUser={() => {}} type={"add"} searchResult={searchData}/>
            <ButtonSimple title={"Cancel"} onClickAction={() => {
                dispatch(setModalState(false));
                dispatch(setModalContent(null));
            }}/>
        </motion.div>
    )
}

function NewGroup() {

    const [description, setDescription] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [searchText, setSearchText] = useState<string>("")
    const [searchData, setSearchData] = useState<MemberInfo[]>([])
    const [selectedData, setSelectedData] = useState<MemberInfo[]>([])

    const jwt = useAppSelector(selectJwt);
    const theme = useAppSelector(selectTheme);

    const dispatch = useAppDispatch();

    const headers = {
        Authorization: "Bearer " + jwt
    }

    const searchHandler = (event: any) => {
        if (event.target.value.length <= 3) setSearchData([]);
        else axios.post("https://xmess-gateway-service.jelastic.regruhosting.ru/chats/searchUsersGlobal", {part: event.target.value}, {headers: headers})
            .then((res) => {
                if (res.data instanceof Array<any>)
                    setSearchData(res.data);
            })
    }

    const sendHandler = () => {
        if (title.length > 0) {
            axios.post("https://xmess-gateway-service.jelastic.regruhosting.ru/chats/newGroup", {
                title: title,
                description: description,
                membersUsernames: selectedData.map(user => user.username)
            }, {headers: headers}).then(() => {
                dispatch(setModalState(false));
                dispatch(setModalContent(null));
            })
        }
    }

    const scrollSelectedUsers: any = useRef(null);
    const selectedUsernames = selectedData.map(data => data.username);

    return (
        <motion.div className={"group"} animate={{borderColor: theme.colors.border}} layout>
            <InputText placeholder={"Chat title"} value={title} type={"text"} setValue={setTitle}/>
            <InputText placeholder={"Chat description"} value={description} type={"text"} setValue={setDescription}/>
            <motion.div className={"selectedUsersContainer"} ref={scrollSelectedUsers} layout>
                <motion.div className={"selectedUsersBox"} drag={"x"} dragConstraints={scrollSelectedUsers} layout>
                    {selectedData.length > 0 ?
                        selectedData.map(data => data.username)
                            .map(username => <SelectedUser username={username}
                                                           key={username}
                                                           remove={() => {
                                                               setSelectedData(selectedData.filter(data => data.username !== username))
                                                           }}/>)
                        : <motion.p layout animate={{color: theme.colors.textSecond}}>No selected users</motion.p>}
                </motion.div>
            </motion.div>
            <InputText placeholder={"Search user"} value={searchText} type={"text"} onChange={searchHandler} setValue={setSearchText}/>
            <GlobalSearch
                addUser={(user) => {
                    selectedData.push(user);
                    setSelectedData(selectedData);
                }}
                removeUser={(user) => {
                    setSelectedData(selectedData.filter(data => data.username !== user.username))
                }}
                type={"check"} searchResult={searchData.filter(data => !selectedUsernames.includes(data.username))}/>
            <motion.div className={"NewChatFooter"} layout>
                <ButtonSimple title={"Cancel"} onClickAction={() => {
                    dispatch(setModalState(false));
                    dispatch(setModalContent(null));
                }}/>
                <ButtonAccent title={"Create"} onClickAction={sendHandler} isLoading={false}/>
            </motion.div>
        </motion.div>
    )
}

function SelectedUser(props: {username: string, remove: () => void}) {
    const theme = useAppSelector(selectTheme);
    return (
        <motion.div animate={{
            background: theme.colors.toggle.text.background,
            color: theme.colors.textMain
        }} className={"SelectedUser"}>
            <p>{props.username}</p>
            <ButtonThird icon={theme.media.closeGlobal} onClickAction={props.remove}/>
        </motion.div>
    )
}
