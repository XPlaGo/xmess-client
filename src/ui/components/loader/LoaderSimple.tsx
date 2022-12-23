import "./LoaderSimple.css";
import {motion} from "framer-motion";
import {useAppSelector} from "../../../app/hooks";
import {selectTheme} from "../../../features/theme/themeSlice";

export interface LoaderSimpleProps {
    color?: string,
    className?: string,
    animate?: any
}

export default function LoaderSimple(props: LoaderSimpleProps) {

    const theme = useAppSelector(selectTheme);

    const draw = {
        hidden: { pathLength: 0, opacity: 0, rotate: 0 },
        visible: (i: number) => {
            return {
                pathLength: [0, 0.25, 0.5, 0.75, 1],
                pathOffset: [1, 0, 2, 0, 3],
                opacity: 1,
                transition: {
                    type: "spring",
                    repeat: Infinity,
                    duration: 4,
                    opacity: { duration: 0.01 }
                }
            };
        }
    };

    return (
        <motion.span initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}} layout className={"LoaderSimple " + ((props.className != null) ? props.className : "")}>
            <motion.svg height={26} width={26} initial="hidden" animate={props.animate != null ? props.animate : "visible"} exit={"hidden"}>
                <motion.circle
                    cx={"13"}
                    cy={"13"}
                    r={"12"}
                    fill={"rgba(0, 0, 0, 0)"}
                    strokeWidth={2}
                    stroke={props.color !== undefined ? props.color : theme.colors.loader.simple.color}
                    strokeLinecap={"round"}
                    variants={draw}
                    custom={1}
                />
            </motion.svg>
        </motion.span>
    )
}
