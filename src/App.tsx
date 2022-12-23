import './App.css';
import { motion } from "framer-motion";
import {useAppDispatch, useAppSelector} from './app/hooks';
import { selectTheme, Theme } from './features/theme/themeSlice';
import Header from './ui/header/Header';
import MainContent from './ui/main-content/MainContent';
import useUIType from "./ui/tools/hooks/useUIType";
import Assistant from "./ui/components/assistant/Assistant";
import {selectChatsPanelState, selectContentState} from "./features/navigation/navigationSlice";
import {selectModalState} from "./features/modal/modalSlice";
import Modal from "./ui/components/modal/Modal";

function App() {
    const theme: Theme = useAppSelector(selectTheme);
    const chatsState = useAppSelector(selectChatsPanelState);
    const UIType = useUIType()
    const modalState = useAppSelector(selectModalState);

    return (
        <motion.div id="App" className={UIType} animate={{background: theme.colors["appBackground"]}}>
            { (UIType === "pc" || chatsState === "opened") &&
                <Header/>
            }
            <MainContent/>
            { modalState && <Modal/>}
        </motion.div>
    );
}

export default App;
