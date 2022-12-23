import {AnimatePresence, motion} from "framer-motion";
import { useState } from "react";
import {useAppDispatch, useAppSelector} from "src/app/hooks";
import { selectTheme } from "src/features/theme/themeSlice";
import { AuthService } from "src/service/auth/AuthService";
import ButtonAccent from "src/ui/components/button/accent/ButtonAccent";
import InputText from "src/ui/components/input/text/InputText";

import "./SignIn.css";
import useUIType from "../../../tools/hooks/useUIType";
import ButtonSimple from "../../../components/button/simple/ButtonSimple";
import {setAuthNav, setClientNav} from "../../../../features/navigation/navigationSlice";

export interface SignInProps {
    setType: (type: "signin" | "signup") => void
}

export default function SignIn(props: SignInProps) {
    const theme = useAppSelector(selectTheme);
    const UIType = useUIType();
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    return (
        <motion.form
            layout
            initial={{y: -50, opacity: 0}}
            exit={{y: 50, opacity: 0}}
            key="signin"
            transition={{
                type: "easeInOut"
            }}
            animate={{
                y: 0,
                opacity: 1
            }}>
            <AnimatePresence>
                <motion.h2 layout key={"h2"}
                    transition={{
                        type: "easeInOut",
                        color: {duration: 0.2},
                    }}
                    animate={{color: theme.colors.textMain}}>Sign In</motion.h2>
                <InputText key={"username"} type={"username"} placeholder="Username" setValue={(value) => {
                    setError(null)
                    setUsernameOrEmail(value)
                }} value={usernameOrEmail}/>
                <InputText key={"password"} type={"password"} placeholder="Password" setValue={(value) => {
                    setError(null)
                    setPassword(value)
                }} value={password}/>

                {error != null && <Error key={"error"} error={error}/>}

                <ButtonAccent
                    key="buttonAccent"
                    title="Sign In"
                    onClickAction={(event) => {
                        event.preventDefault();
                        AuthService.signin(
                            {username: usernameOrEmail, password: password},
                            setError,
                            setLoading,
                            dispatch
                        ).then(data => {
                            if (data != null) {
                                dispatch(setClientNav());
                            } else {
                                dispatch(setAuthNav());
                            }
                        });
                    }}
                    isLoading={isLoading}
                />

                {
                    UIType !== "pc" &&
                    <ButtonSimple key="buttonSimple" defaultTextStyle={{color: "#0099ff"}} title="Sign Up" onClickAction={(event) => {
                        event.preventDefault();
                        props.setType("signup");
                    }}/>
                }
            </AnimatePresence>
        </motion.form>
    )
}

interface ErrorProps {
    error: string | null
}

function Error(props: ErrorProps) {
    return (
        <motion.p
            layout
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            animate={{opacity: 1}}
            className={"error"}
            transition={{
                type: "easeInOut"
            }}
        >{props.error}</motion.p>
    )
}
