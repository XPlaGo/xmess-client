import {AnimatePresence, motion, useAnimation} from "framer-motion";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectTheme} from "../../../features/theme/themeSlice";
import "./Avatar.css";
import ButtonWithIcon from "../button/with-icon/ButtonWithIcon";
import axios from "axios";
import {selectJwt, setProfileAvatar} from "../../../features/auth/authSlice";
import {selectSelectedChatId, setChatAvatar} from "../../../features/chat/chatSlice";
import {AvatarService} from "../../../service/auth/AvatarService";

export interface AvatarProps {
    type: string | null | undefined,
    avatar: string | null | undefined,
    size: number,
    isOnline: boolean | undefined,
    canUpload?: boolean
}

export default function Avatar(props: AvatarProps) {

    const theme = useAppSelector(selectTheme);
    const [isAvatarLoaded, setAvatarLoaded] = useState(true);
    const [isOnline, setOnline] = useState(props.isOnline);
    const [reset, setReset] = useState<NodeJS.Timeout | null>(null);
    const [isHover, setHover] = useState(false);
    const jwt = useAppSelector(selectJwt);
    const selectedChatId = useAppSelector(selectSelectedChatId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (props.isOnline) {
            if (reset != null) clearTimeout(reset);
            setOnline(true);
        } else {
            setReset(setTimeout(() => {
                setOnline(false)
            }, 5000))
        }
    }, [props.isOnline])

    useEffect(() => {
        if (props.avatar == null) setAvatarLoaded(true);
    }, [props.avatar])

    const uploadImage = (event: any) => {
        event.preventDefault();
        inputRef.current.click()
    }

    const handleUpload = (event: any) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        if (props.type === "GROUP") {
            if (selectedChatId != null)
                axios.post(
                    "https://xmess-gateway-service.jelastic.regruhosting.ru/document/chatAvatar",
                    formData,
                    {
                        headers: {
                            Authorization: "Bearer " + jwt,
                            "Content-Type": "multipart/form-data",
                            "chatId": selectedChatId
                        }
                    }
                ).then(res => {
                    AvatarService.loadAvatar(res.data, jwt)?.then(res => {
                        dispatch(setChatAvatar({id: selectedChatId, data: res}))
                    })
                })
        } else {
            axios.post(
                "https://xmess-gateway-service.jelastic.regruhosting.ru/document/avatar",
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + jwt,
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then(res => {
                AvatarService.loadAvatar(res.data, jwt)?.then(res => {
                    dispatch(setProfileAvatar(res))
                })
            })
        }
    }

    const inputRef: any = useRef(null);

    const controls = useAnimation()
    return (
        <motion.div key={"icon"}
                    transition={{
                        type: "easeInOut"
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{
                        height: props.size,
                        width: props.size
                    }}
                    layout
                    className={"Icon"}>
            <motion.div layout className={"IconBox"}>
            {
                props.avatar &&
                <motion.img key={"avatar"}
                            initial={{opacity: 0}}
                            animate={controls}
                            exit={{opacity: 0}}
                            onChange={() => {
                                setAvatarLoaded(false);
                            }}
                            onLoad={() => {
                                setAvatarLoaded(true);
                                controls.start({
                                    opacity: 1
                                })
                            }}
                            src={`data:image/jpeg;charset=utf-8;base64,${props.avatar}`}/>
            }
            <AnimatePresence exitBeforeEnter>
                { (!isAvatarLoaded || !props.avatar) &&
                    <motion.img className={"default"}
                                key={"defaultAvatar"}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                src={props.type === "GROUP" ? theme.media.group.noAvatar : theme.media.dialogue.noAvatar}/>
                }
                {
                    isHover && props.canUpload != null && props.canUpload && <ButtonWithIcon keyValue={"edit"} icon={theme.media.edit} onClickAction={uploadImage}/>
                }
                <input key={"input"} ref={inputRef} style={{display: "none"}} type={"file"} accept=".png, .jpg, .jpeg" onChange={handleUpload}/>
            </AnimatePresence>
            </motion.div>
            <AnimatePresence>
                { isOnline && <motion.span layout
                                                 key={"ind"}
                                                 initial={{scale: 0}}
                                                 animate={{scale: 1}}
                                                 exit={{scale: 0}}
                                                 className={"OnlineInd"}></motion.span>}
            </AnimatePresence>
        </motion.div>
    )
}
