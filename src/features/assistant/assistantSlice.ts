import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {DocumentData} from "../../ui/main-content/client/chat-panel/chat-list/message/ChatMessage";

export interface AssistantState {
    isListening: boolean
}

const initialState: AssistantState = {
    isListening: false
};

export const assistantSlice = createSlice({
    name: "assistant",
    initialState: initialState,
    reducers: {
        setAssistantListening: (state, action: PayloadAction<boolean>) => {
            state.isListening = action.payload;
        },
        resetAssistant: (state) => {
            state.isListening = false
        }
    }
})

export const {setAssistantListening, resetAssistant} = assistantSlice.actions;

export const selectIsListening = (state: RootState) => state.assistant.isListening;

export default assistantSlice.reducer;
