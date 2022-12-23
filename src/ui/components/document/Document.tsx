import {motion} from "framer-motion";
import {useAppSelector} from "../../../app/hooks";
import {selectTheme} from "../../../features/theme/themeSlice";
import "./Document.css";
import ButtonWithIcon from "../button/with-icon/ButtonWithIcon";
import axios from "axios";
import fileDownload from "js-file-download";
import {selectJwt} from "../../../features/auth/authSlice";
import {useState} from "react";
import LoaderSimple from "../loader/LoaderSimple";

interface DocumentProps {
    id: string | null,
    number: number,
    name: string,
    removeItem: () => void,
    type: "MESSAGE" | "INPUT",
    isLoading?: boolean
}

export default function Document(props: DocumentProps) {
    const theme = useAppSelector(selectTheme);
    const type = props.name?.substring(props.name.lastIndexOf(".") + 1, props.name.length)
    const name = props.name?.substring(0, props.name.lastIndexOf(".")).toUpperCase();
    const jwt = useAppSelector(selectJwt);
    const [isDownload, setDownload] = useState(false);

    const headers = {
        Authorization: "Bearer " + jwt
    }

    function download() {
        setDownload(true);
        if (props.id != null) axios.get("https://xmess-gateway-service.jelastic.regruhosting.ru/document/" + props.id, {headers: headers, responseType: "arraybuffer"}).then(res => {
            fileDownload(res.data, props.name);
            setDownload(false);
        })
    }

    let colorType = theme.colors.document.background[type] != null ? type : "default"

    return (
        <motion.div layout
                    key={String(props.id)}
                    transition={{
                        type: "easeInOut"
                    }}
                    initial={props.type === "INPUT" ? {scale: 0.5, opacity: 0} : {opacity: 0}}
                    exit={props.type === "INPUT" ? {scale: 0.5, opacity: 0} : {opacity: 0}}
                    animate={{
                        background: theme.colors.document.background[colorType],
                        borderColor: theme.colors.document.border[colorType],
                        scale: 1,
                        opacity: 1
                    }}
                    className={"Document"}>
            { isDownload || props.isLoading ?
                <LoaderSimple color={theme.colors.document.border[colorType]}/>
                : <motion.p
                    animate={{
                        color: theme.colors.document.color
                    }}
                    layout>{type}
                </motion.p>
            }
            <motion.span
                animate={{
                    color: theme.colors.document.nameColor
                }}
                layout>
                {name}
            </motion.span>
            <ButtonWithIcon
                icon={props.type === "INPUT"  ? theme.media.close : theme.media.download}
                onClickAction={props.type === "INPUT" ? props.removeItem : download}
                defaultStyle={{
                    background: theme.colors.document.close.background,
                    borderColor: theme.colors.document.close.border,
                }}/>
        </motion.div>
    )
}
