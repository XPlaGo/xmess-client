import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {DocumentData} from "../../ui/main-content/client/chat-panel/chat-list/message/ChatMessage";
import {stat} from "fs";

export interface ChatState {
    selectedChat: {
        id: string | null,
    }
    chats: Array<ChatData>
}

export interface ChatData {
    id: string,
    title: string | null,
    hasUnreadMessage: boolean,
    lastMessage: string | null,
    lastMessageTime: number,
    chatType: string,
    members: MemberInfo[],
    avatarId: string | null,
    avatar: any,
    documents: DocumentData[]
}

export interface MemberInfo {
    username: string,
    status: string,
    messagingStatus: string,
    avatarId: string,
    avatar: string | null
}

const initialState: ChatState = {
    selectedChat: {id: null},
    chats: []
};

export const chatSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setChatsData: (state, action: PayloadAction<ChatData[]>) => {
            state.chats = action.payload;
        },
        updateChat: (state, action: PayloadAction<{id: string, data: ChatData}>) => {
            let flag = false;
            for (let i = 0; i < state.chats.length; i++) {
                if (state.chats[i].id === action.payload.id) {

                    flag = true;

                    for (let k = 0; k < action.payload.data.members.length; k++) {
                        for (let j = 0; j < state.chats[i].members.length; j++) {
                            if (action.payload.data.members[k].username === state.chats[i].members[j].username) {
                                state.chats[i].members[j].messagingStatus = action.payload.data.members[k].messagingStatus;
                                state.chats[i].members[j].status = action.payload.data.members[k].status;
                            }
                        }
                    }

                    state.chats[i].documents = action.payload.data.documents;
                    state.chats[i].lastMessage = action.payload.data.lastMessage;
                    state.chats[i].hasUnreadMessage = action.payload.data.hasUnreadMessage;
                    state.chats[i].lastMessageTime = action.payload.data.lastMessageTime;
                    break;
                }
            }
            if (!flag) state.chats.push(action.payload.data);
        },
        setChatAvatar: (state, action: PayloadAction<{id: string, data: any}>) => {
            for (let i = 0; i < state.chats.length; i++) {
                if (state.chats[i].id === action.payload.id) {
                    state.chats[i].avatar = action.payload.data;
                    break;
                }
            }
        },
        setChatMemberAvatar: (state, action: PayloadAction<{chatId: string, member: string, data: string}>) => {
            for (let i = 0; i < state.chats.length; i++) {
                if (state.chats[i].id === action.payload.chatId) {
                    for (let j = 0; j < state.chats[i].members.length; j++) {
                        if (state.chats[i].members[j].username === action.payload.member) {
                            state.chats[i].members[j].avatar = action.payload.data;
                            break;
                        }
                    }
                    break;
                }
            }
        },
        setSelectedChatId: (state, action: PayloadAction<string | null>) => {
            state.selectedChat.id = action.payload;
        },
        resetSelectedChat: (state) => {
            state.selectedChat.id = null;
        },

        resetChats: (state) => {
            state.selectedChat.id = null;
            state.chats = []
        }
    }
})

export const {setChatsData, setChatMemberAvatar, setChatAvatar, setSelectedChatId, resetSelectedChat, updateChat, resetChats} = chatSlice.actions;

export const selectSelectedChatId = (state: RootState) => state.chat.selectedChat.id;
export const selectSelectedChat = (state: RootState) => {
    for (let chat of state.chat.chats)
        if (chat.id === state.chat.selectedChat.id) return chat;
    return null;
}
export const selectChats = (state: RootState) => state.chat.chats;

export default chatSlice.reducer;
