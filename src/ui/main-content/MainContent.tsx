import {LayoutGroup, motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import "./MainContent.css";
import {
    selectContentState,
    selectInfoState,
    selectNavigation,
    setAuthNav,
    setClientNav
} from "../../features/navigation/navigationSlice";
import {useEffect, useState} from "react";
import {selectAuth, selectJwt, selectRefreshToken} from "../../features/auth/authSlice";
import {AuthService} from "../../service/auth/AuthService";
import MainSection from "./main-section/MainSection";
import ContentSection from "./content-section/ContentSection";
import useUIType from "../tools/hooks/useUIType";
import InfoSection from "./info-section/InfoSection";
import {StompSessionProvider} from "react-stomp-hooks";
import Assistant from "../components/assistant/Assistant";

export interface MainContentProps {

}

export default function MainContent(props: MainContentProps) {

    const auth = useAppSelector(selectAuth);
    const navigation = useAppSelector(selectNavigation);
    const dispatch = useAppDispatch();
    const UIType = useUIType();
    const [isContentOpen, setContentOpen] = useState(false);
    const isInfoOpen = useAppSelector(selectInfoState);
    const jwt = useAppSelector(selectJwt);
    const refreshToken = useAppSelector(selectRefreshToken);
    const isContentOpened = useAppSelector(selectContentState);

    const [isRefresh, setRefresh] = useState(true);

    useEffect(() => {
        if (auth.jwtToken == null && auth.refreshToken != null)
            AuthService.refresh({refreshToken: auth.refreshToken}, () => {}, setRefresh, dispatch).then(response => {
                setRefresh(false)
                if (response == null) dispatch(setAuthNav())
                else dispatch(setClientNav())
            })
        else {
            setRefresh(false)
        }
    }, [auth.jwtToken, auth.refreshToken, dispatch])

    const headers = {
        Authorization: `Bearer ${jwt}`,
        'Access-Control-Allow-Origin': '*',
    }

    if (navigation.content === "auth")
        return (
            <motion.main
                className={"MainContent " + UIType}
                style={{height: window.innerHeight}}
                transition={{type: "easeInOut"}}>
                <LayoutGroup>
                    <MainSection isRefresh={isRefresh}/>
                    {
                        (UIType === "pc" || isContentOpen) && <ContentSection isRefresh={isRefresh}/>
                    }
                    {
                        isInfoOpen && <InfoSection/>
                    }
                </LayoutGroup>
            </motion.main>
        );
    else
        return (
            <motion.main
                className={"MainContent " + UIType}
                style={{height: window.innerHeight}}
                transition={{type: "easeInOut"}}>
                <LayoutGroup>
                    <StompSessionProvider
                        debug={(d) => console.log(d)}
                        onStompError={() => AuthService.refresh({refreshToken: refreshToken}, () => {}, () => {}, dispatch)}
                        connectHeaders={headers}
                        url={"https://xmess-gateway-service.jelastic.regruhosting.ru/socket"}>
                        <Assistant dispatch={dispatch}/>
                        {
                            (UIType === "pc" || UIType === "tablet" || (UIType === "mobile" && !isContentOpened))
                            && <MainSection isRefresh={isRefresh}/>
                        }
                        {
                            (UIType === "pc" || UIType === "tablet" || (UIType === "mobile" && isContentOpened) || isRefresh)
                            && <ContentSection isRefresh={isRefresh}/>
                        }
                        {
                            UIType === "pc" && isInfoOpen && <InfoSection/>
                        }
                    </StompSessionProvider>
                </LayoutGroup>
            </motion.main>
        );
}
