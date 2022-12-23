import {motion} from "framer-motion";
import Avatar from "../../../../components/avatar/Avatar";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {removeAuth, selectProfile} from "../../../../../features/auth/authSlice";
import ButtonWithIcon from "../../../../components/button/with-icon/ButtonWithIcon";
import {selectTheme} from "../../../../../features/theme/themeSlice";
import "./Profile.css";
import {setAuthNav} from "../../../../../features/navigation/navigationSlice";
import {resetAssistant} from "../../../../../features/assistant/assistantSlice";
import {resetChats} from "../../../../../features/chat/chatSlice";
import {resetMessageInput} from "../../../../../features/message-input/MessageInputSlice";
import {resetModal} from "../../../../../features/modal/modalSlice";

export default function Profile() {
    const profile = useAppSelector(selectProfile);
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    return (
        <motion.div layout
                    animate={{
                        borderColor: theme.colors.border,
                        background: theme.colors.client.chats.header.background
                    }}
                    className={"ProfileSettings"}>
            <Avatar canUpload={true} type={"USER"} avatar={profile.avatar} size={100} isOnline={false}/>
            <motion.h2 layout animate={{color: theme.colors.textMain}}>{profile.username}</motion.h2>
            <motion.p layout animate={{color: theme.colors.textSecond}}>{profile.description ? profile.description : "No description"}</motion.p>
            <ButtonWithIcon icon={theme.media.logout} onClickAction={() => {
                dispatch(removeAuth());
                dispatch(setAuthNav());
                dispatch(resetAssistant());
                dispatch(resetChats());
                dispatch(resetMessageInput());
                dispatch(resetModal());
            }} text={"Logout"}/>
        </motion.div>
    )
}
