import { useAppSelector } from "src/app/hooks";
import { selectTheme } from "src/features/theme/themeSlice";
import { motion } from "framer-motion";
import ButtonSimple from "src/ui/components/button/simple/ButtonSimple";
import "./RightPanel.css";

export interface RightPanelProps {
    type: "signin" | "signup",
    setType: (type: "signin" | "signup") => void
}

export default function RightPanel(props: RightPanelProps) {
    const theme = useAppSelector(selectTheme);
    return (
        <motion.div
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 100}}
                key={"rightPanel"}
                className="RightPanel"
                transition={{type: "easeInOut"}}>
                    <motion.div
                        className="container"
                        style={{
                            background: theme.colors.authorization.side.container.background,
                            borderColor: theme.colors.border,
                            boxShadow: "0 0 10px " + theme.colors.authorization.side.container.shadow,
                        }}>
                        <p style={{color: theme.colors.textSecond}}>Check out</p>
                        <a target="blank" href={"https://xmess-about.framer.website/"} style={{
                            color: theme.colors.authorization.side.container.spanColor,
                            textShadow: "0 2px 10px " + theme.colors.authorization.side.container.spanColor,
                            }}>the presentation site</a>
                    </motion.div>
                    <motion.div className={"box"}>
                        {props.type == "signin" ? (
                            <>
                                <p style={{
                                    color: theme.colors.textSecond,
                                }}>Don't have an account yet?</p>
                                <ButtonSimple defaultTextStyle={{color: "#0099ff"}} title="Sign Up" onClickAction={(event) => {props.setType("signup")}}/>
                            </>
                        ) : (
                            <>
                                <p style={{
                                    color: theme.colors.textSecond,
                                }}>Already have an account?</p>
                                <ButtonSimple defaultTextStyle={{color: "#0099ff"}} title="Sign In" onClickAction={(event) => {props.setType("signin")}}/>
                            </>
                        )
                        }
                    </motion.div>
            </motion.div>
    )
}
