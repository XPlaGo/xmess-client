import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {DocumentData} from "../../ui/main-content/client/chat-panel/chat-list/message/ChatMessage";

export interface MessageInputState {
    text: string,
    documents: {id: number, file: File}[]
}

const initialState: MessageInputState = {
    text: "",
    documents: []
};

export const messageInputSlice = createSlice({
    name: "messageInput",
    initialState: initialState,
    reducers: {
        setMessageInputText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        setMessageInputDocuments: (state, action: PayloadAction<{id: number, file: File}[]>) => {
            state.documents = action.payload;
        },
        resetMessageInput: (state) => {
            state.text = "";
            state.documents = [];
        }
    }
})

export const {setMessageInputText, setMessageInputDocuments, resetMessageInput} = messageInputSlice.actions;

export const selectMessageInputText = (state: RootState) => state.messageInput.text;
export const selectMessageInputDocuments = (state: RootState) => state.messageInput.documents;

export default messageInputSlice.reducer;
