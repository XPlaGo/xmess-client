import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import SettingsDark from "src/ui/img/SettingsDark.png";
import SettingsLight from "src/ui/img/SettingsLight.png";
import { ThemeDark } from "./ThemeDark";
import { ThemeLight } from "./ThemeLight";

export interface Theme {
    name: string
    colors: any
    media: any
}

const defaultThemes: {[name: string]: Theme} = {
    DefaultDark: ThemeDark,
    DefaultLight: ThemeLight
}

export interface ThemeState {
    theme: Theme
}

function initTheme(): Theme {
    let local: string | null = localStorage.getItem("theme");
    if (local === null || !defaultThemes.hasOwnProperty(local)) {
        local = "auto";
        localStorage.setItem("theme", local);
    }
    if (local === "auto") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? defaultThemes["DefaultDark"] : defaultThemes["DefaultLight"]
    }
    else {
        return defaultThemes[local];
    }
}

const initialState: ThemeState = {
    theme: initTheme()
}

export const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        setDark: (state) => {
            state.theme = defaultThemes.DefaultDark;
            localStorage.setItem("theme", "DefaultDark");
        },
        setLight: (state) => {
            state.theme = defaultThemes.DefaultLight;
            localStorage.setItem("theme", "DefaultLight");
        },
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        }
    }
});

export const {setDark, setLight, setTheme} = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;