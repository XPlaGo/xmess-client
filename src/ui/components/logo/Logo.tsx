import "./logoStyle.css"
import { motion } from "framer-motion";
import {useAppSelector} from "../../../app/hooks";
import {selectTheme} from "../../../features/theme/themeSlice";

interface LogoElementProps {
    size: number,
    background?: string,
    animationDelay: number
}

enum MVerticalPositions {LEFT, RIGHT}
enum MDiagonalDirection {FROMLEFT, FROMRIGHT}

interface LogoProps extends LogoElementProps{

}

export function AnimLogo(props: LogoProps) {
    const theme = useAppSelector(selectTheme);
    return (
        <motion.div className="animLogo" layoutId={"animLogo"} layout style={{
            width: props.size,
            height: props.size,
            background: props.background == null ? "rgba(0, 0, 0, 0)" : props.background
        }}>
            <XDiagonal
                size={props.size}
                startDegree={90}
                degree={45}
                background={theme.colors.logo.xBackFirst}
                animationDelay={props.animationDelay}/>
            <XDiagonal
                size={props.size}
                startDegree={-90}
                degree={-45}
                background={theme.colors.logo.xBackSecond}
                animationDelay={props.animationDelay}/>

            <MVertical
                className={""}
                size={props.size}
                boxPosition={MVerticalPositions.LEFT}
                background={"#0099FF"}
                animationDelay={props.animationDelay + 0.5}/>

            <MDiagonal
                className={""}
                size={props.size}
                direction={MDiagonalDirection.FROMLEFT}
                background={"#0099FF"}
                animationDelay={props.animationDelay + 0.7}/>
            <MVertical
                className={"glass vertical right"}
                size={props.size}
                boxPosition={MVerticalPositions.RIGHT}
                background={"rgba(255, 255, 255, 0.4)"}
                animationDelay={props.animationDelay + 0.9}/>
            <MDiagonal
                className={"glass diagonal right"}
                size={props.size}
                direction={MDiagonalDirection.FROMRIGHT}
                background={"rgba(255, 255, 255, 0.4)"}
                animationDelay={props.animationDelay + 1.1}/>

        </motion.div>
    )
}

export function MiniLogo(props: LogoProps) {
    const theme = useAppSelector(selectTheme)
    return (
        <motion.div className="animLogo" layout style={{
            width: props.size,
            height: props.size,
            background: props.background == null ? "rgba(0, 0, 0, 0)" : props.background
        }}>
            <MVertical
                className={""}
                size={props.size}
                boxPosition={MVerticalPositions.LEFT}
                background={theme.colors.logo.mini["secondBackground"]}
                animationDelay={props.animationDelay + 0.5}/>

            <MDiagonal
                className={""}
                size={props.size}
                direction={MDiagonalDirection.FROMLEFT}
                background={theme.colors.logo.mini["secondBackground"]}
                animationDelay={props.animationDelay + 0.7}/>

            <MVertical
                className={""}
                size={props.size}
                boxPosition={MVerticalPositions.RIGHT}
                border={theme.colors["border"]}
                background={theme.colors.logo.mini["firstBackground"]}
                animationDelay={props.animationDelay + 0.7}/>
            <MDiagonal
                className={""}
                size={props.size}
                direction={MDiagonalDirection.FROMRIGHT}
                border={theme.colors["border"]}
                background={theme.colors.logo.mini["firstBackground"]}
                animationDelay={props.animationDelay + 0.5}/>

        </motion.div>
    )
}

interface XDiagonalProps extends LogoElementProps {
    startDegree: number,
    degree: number
}

function XDiagonal(props: XDiagonalProps) {
    return (
        <motion.span
            style={{
                width: props.size * 0.32,
                height: props.size * 0.68 * Math.sqrt(2) + props.size * 0.32,
                borderRadius: props.size * 0.16,
            }}
            initial={{
                rotate: props.startDegree,
                opacity: 0
            }}
            animate={{
                rotate: props.degree,
                opacity: 1,
                background: props.background,
                transition: {
                    type: "easeInOut",
                    duration: 0.2,
                    background: {type: "easeInOut", duration: 0.2, delay: 0},
                    border: {type: "easeInOut", duration: 0.2, delay: 0},
                }
            }}
        >{}</motion.span>
    )
}

interface MVerticalProps extends LogoElementProps {
    boxPosition: MVerticalPositions,
    className: string,
    border?: string
}

function MVertical(props: MVerticalProps) {
    return (
        <motion.span
            className={props.className}
            style={Object.assign({
                    width: props.size * 0.24,
                    height: props.size * 0.92,
                    borderRadius: props.size * 0.12,
                }, props.boxPosition === MVerticalPositions.LEFT ?
                    {left: props.size * 0.04, bottom: props.size * 0.04,} : props.boxPosition === MVerticalPositions.RIGHT ? {right: props.size * 0.04, bottom: props.size * 0.04} : {}
            )
            }
            initial={{
                height: props.size * 0.24,
                opacity: 0,
            }}
            animate={{
                border: "1px solid " + props.border,
                height: props.size * 0.92,
                opacity: 1,
                background: props.background
            }}
            transition={{
                type: props.boxPosition === MVerticalPositions.LEFT ? "easeIn" : props.boxPosition === MVerticalPositions.RIGHT ? "easeOut" : "easeInOut",
                delay: props.animationDelay,
                background: {type: "easeInOut", duration: 0.2, delay: 0},
                border: {type: "easeInOut", duration: 0.2, delay: 0},
                duration: 0.2,
            }}
        >{}</motion.span>
    )
}

interface MDiagonalProps extends LogoElementProps {
    direction: MDiagonalDirection,
    className: string,
    border?: string
}

function MDiagonal(props: MDiagonalProps) {
    return (
        <motion.div
        style={{
            width: props.size * 0.24,
            height: props.size * 0.68 * Math.sqrt(2) + props.size * 0.24,
            borderRadius: props.size * 0.16,
            rotate: props.direction === MDiagonalDirection.FROMLEFT ? -44 : props.direction === MDiagonalDirection.FROMRIGHT ? 44 : 0
        }}>
            <motion.span
                className={props.className}
                style={{
                    width: props.size * 0.24,
                    borderRadius: props.size * 0.12,
                    background: props.background,
                }}
                initial={{
                    height: props.size * 0.24,
                    opacity: 0,
                    top: 0,
                }}
                animate={{
                    height: props.size * 0.68 * Math.sqrt(2) + props.size * 0.245,
                    opacity: 1,
                    top: 0,
                    background: props.background,
                    border: "1px solid " + props.border
                }}
                transition={{
                    type: "linear",
                    duration: 0.2,
                    delay: props.animationDelay,
                    background: {type: "easeInOut", duration: 0.2, delay: 0},
                    border: {type: "easeInOut", duration: 0.2, delay: 0},
                }}
            >{}</motion.span>
        </motion.div>
    )
}
