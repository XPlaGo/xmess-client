import {AnimatePresence, motion} from "framer-motion";
import { useState } from "react";
import {useAppDispatch, useAppSelector} from "src/app/hooks";
import { selectTheme } from "src/features/theme/themeSlice";
import ButtonAccent from "src/ui/components/button/accent/ButtonAccent";
import InputText from "src/ui/components/input/text/InputText";

import "./SignUp.css";
import {AuthService} from "../../../../service/auth/AuthService";
import useUIType from "../../../tools/hooks/useUIType";
import ButtonSimple from "../../../components/button/simple/ButtonSimple";
import {setAuthNav, setClientNav} from "../../../../features/navigation/navigationSlice";

export interface SignInProps {
    setType: (type: "signin" | "signup") => void
}

export default function SignIn(props: SignInProps) {
    const theme = useAppSelector(selectTheme);
    const UIType = useUIType();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    return (
        <motion.form
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
                <motion.h2 key="h2" style={{color: theme.colors.textMain}} layout>Sign Up</motion.h2>
                <InputText key="username" type={"username"} placeholder="Username" setValue={setUsername} value={username}/>
                <InputText key="email" type={"email"} placeholder="Email" setValue={setEmail} value={email}/>
                <InputText key="password" type={"password"} placeholder="Password" setValue={setPassword} value={password}/>
                <InputText key="confirmPassword" type={"password"} placeholder="Confirm password" setValue={setConfirmPassword} value={confirmPassword}/>

                {error != null && <Error key="error" error={error}/>}

                <ButtonAccent
                    key="buttonAccent"
                    title="Sign Up"
                    onClickAction={(event) => {
                        event.preventDefault();
                        if (password !== confirmPassword) setError("Passwords don't match")
                        else {
                            console.log("pas: " + password)
                            AuthService.signup(
                                {
                                    username: username,
                                    email: email,
                                    password: password,
                                },
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
                        }
                }} isLoading={isLoading}/>

                {
                    UIType !== "pc" &&
                    <ButtonSimple
                        key="buttonSimple"
                        defaultTextStyle={{color: "#0099ff"}}
                        title="Sign In"
                        onClickAction={(event) => {
                            event.preventDefault();
                            props.setType("signin");
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

