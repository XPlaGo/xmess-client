import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import Profile from "../../ui/main-content/settings/content/profile/Profile";

export interface AuthState {
    refreshToken: string | null,
    jwtToken: string | null,
    username: string | null,
    profile: Profile
}

export interface Profile {
    username: string | null,
    avatarId: string | null,
    avatar: string | null,
    description: string | null
}

interface RefreshData {
    jwtToken: string | null,
    username: string | null
}

const initialState: AuthState = {
    refreshToken: localStorage.getItem("rt"),
    jwtToken: null,
    username: null,
    profile: {
        username: null,
        avatarId: null,
        avatar: null,
        description: null
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.refreshToken = action.payload.refreshToken;
            state.jwtToken = action.payload.jwtToken;
            state.username = action.payload.username;
            if (typeof action.payload.refreshToken === "string") {
                localStorage.setItem("rt", action.payload.refreshToken)
            }
        },
        setJwt: (state, action: PayloadAction<string>) => {
            state.jwtToken = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        refreshAuth: (state, action: PayloadAction<RefreshData>) => {
            state.jwtToken = action.payload.jwtToken;
            state.username = action.payload.username;
        },
        removeAuth: (state) => {
            state.refreshToken = null;
            state.jwtToken = null;
            state.username = null;
            state.profile = {
                username: null,
                avatar: null,
                avatarId: null,
                description: null
            }
            localStorage.removeItem("rt")
        },
        setProfile: (state, action: PayloadAction<Profile>) => {
            state.profile.username = action.payload.username;
            state.profile.avatarId = action.payload.avatarId;
            state.profile.avatar = action.payload.avatar;
            state.profile.description = action.payload.description;
        },
        setProfileAvatar: (state, action: PayloadAction<string>) => {
            state.profile.avatar = action.payload;
        }
    }
})

export const {setAuth, setJwt, setUsername, refreshAuth, removeAuth, setProfile,setProfileAvatar} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectJwt = (state: RootState) => state.auth.jwtToken;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectProfile = (state: RootState) => state.auth.profile;

export default authSlice.reducer;
