import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export type AuthType = "signin" | "signup";

export interface NavigationState {
    content: "auth" | "client" | "admin" | "settings",
    authType: AuthType,
    chatsState: "opened" | "closed",
    isInfoOpen: boolean,
    isContentOpened: boolean,
    settingsSection: "profile" | "about"
}

const initialState: NavigationState = {
    content: "auth",
    authType: "signin",
    chatsState: "opened",
    isInfoOpen: false,
    isContentOpened: false,
    settingsSection: "profile"
};

export const navigationSlice = createSlice({
    name: "navigation",
    initialState: initialState,
    reducers: {
        setNavigation: (state, action: PayloadAction<NavigationState>) => {
            state.content = action.payload.content;
        },
        setClientNav: (state) => {
            state.content = "client"
        },
        setAuthNav: (state) => {
            state.content = "auth"
        },
        setAdminNav: (state) => {
            state.content = "admin"
        },
        setSettingsNav: (state) => {
            state.content = "settings"
        },

        setAuthType: (state, action: PayloadAction<AuthType>) => {
            state.authType = action.payload;
        },

        setChatsOpened: (state) => {
            state.chatsState = "opened"
        },
        setChatsClosed: (state) => {
            state.chatsState = "closed"
        },

        setInfoOpen: (state, action: PayloadAction<boolean>) => {
            state.isInfoOpen = action.payload;
        },

        setContentOpen: (state, action: PayloadAction<boolean>) => {
            state.isContentOpened = action.payload;
        },

        setSettingsSection: (state, action: PayloadAction<"profile" | "about">) => {
            state.settingsSection = action.payload;
        },

        resetNavigation: (state) => {
            state.content = "auth";
            state.authType = "signin";
            state.chatsState = "opened";
            state.isInfoOpen = false;
            state.isContentOpened = false;
            state.settingsSection = "profile"
        }
    }
})

export const {
    setNavigation,
    setClientNav,
    setAuthNav,
    setAdminNav,
    setAuthType,
    setChatsOpened,
    setChatsClosed,
    setSettingsNav,
    setContentOpen,
    setSettingsSection,
    resetNavigation,
    setInfoOpen} = navigationSlice.actions;

export const selectNavigation = (state: RootState) => state.navigation;
export const selectAuthType = (state: RootState) => state.navigation.authType;
export const selectChatsPanelState = (state: RootState) => state.navigation.chatsState;
export const selectInfoState = (state: RootState) => state.navigation.isInfoOpen;
export const selectContentState = (state: RootState) => state.navigation.isContentOpened;
export const selectSettingsSection = (state: RootState) => state.navigation.settingsSection;

export default navigationSlice.reducer;
