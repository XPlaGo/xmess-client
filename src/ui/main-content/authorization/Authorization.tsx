import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import "./Authorization.css";
import SignIn from "./signin/SignIn";
import SignUp from "./singup/SignUp";
import {useAppDispatch, useAppSelector} from "src/app/hooks";
import { selectTheme } from "src/features/theme/themeSlice";
import { AnimLogo } from "src/ui/components/logo/Logo";
import useUIType from "../../tools/hooks/useUIType";
import {selectAuthType, setAuthType} from "../../../features/navigation/navigationSlice";

export interface AuthorizationProps {

}

export default function Authorization(props: AuthorizationProps) {
    const theme = useAppSelector(selectTheme);
    const authType = useAppSelector(selectAuthType);
    const dispatch = useAppDispatch();
    const UIType = useUIType();
    return (
        <motion.div className={"Authorization " + UIType} key={"auth"} layout>
            <motion.div className={"authBox"}
                        animate={{
                            background: theme.colors.authorization.main.boxBackground,
                            borderColor: theme.colors.authorization.main.border,
                        }}>
                <LayoutGroup>
                <AnimLogo size={UIType === "mobile" ? 150 : 200} animationDelay={0}/>
                <AnimatePresence exitBeforeEnter>
                    {authType === "signin" ?
                        <SignIn setType={(value) => dispatch(setAuthType(value))} key="signin"/>
                        : <SignUp setType={(value) => dispatch(setAuthType(value))} key="signup"/>
                    }
                </AnimatePresence>
                </LayoutGroup>
            </motion.div>
        </motion.div>
    )
}
