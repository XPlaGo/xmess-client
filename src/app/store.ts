import {configureStore, ThunkAction, Action, getDefaultMiddleware} from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import authReducer from '../features/auth/authSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import chatReducer from '../features/chat/chatSlice';
import assistantReducer from '../features/assistant/assistantSlice';
import messageInputReducer from '../features/message-input/MessageInputSlice';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    navigation: navigationReducer,
    chat: chatReducer,
    assistant: assistantReducer,
    messageInput: messageInputReducer,
    modal: modalReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
