import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {ReactNode} from "react";

export interface ModalState {
    isShow: boolean,
    content: ReactNode | null
}

const initialState: ModalState = {
    isShow: false,
    content: null
};

export const modalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        setModalState: (state, action: PayloadAction<boolean>) => {
            state.isShow = action.payload;
        },
        setModalContent: (state, action: PayloadAction<ReactNode>) => {
            state.content = action.payload;
        },
        resetModal: (state) => {
            state.isShow = false;
            state.content = null;
        }
    }
})

export const {setModalState, setModalContent, resetModal} = modalSlice.actions;

export const selectModalState = (state: RootState) => state.modal.isShow;
export const selectModalContent = (state: RootState) => state.modal.content;

export default modalSlice.reducer;
