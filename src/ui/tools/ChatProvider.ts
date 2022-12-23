import {ChatData, MemberInfo} from "../../features/chat/chatSlice";

export class ChatProvider {
    public static convertForChatItem(chatData: ChatData | null, username: string | null): ChatData | null {
        if (username == null || chatData == null) return null;
        return {
            ...chatData,
            title: this.convertTitle(chatData, username),
            avatarId: this.convertAvatarId(chatData, username),
            avatar: this.convertAvatar(chatData, username)
        }
    }

    public static convertForMemberInfo(memberData: MemberInfo | null, username: string | null): MemberInfo | null {
        if (username == null || memberData == null) return null;
        return {
            ...memberData,
            username: memberData.username === username ? "You" : memberData.username
        }
    }

    public static convertTitle(chat: ChatData | null, username: string | null): string | null {
        if (chat == null || username == null) return null
        if (chat.chatType === "DIALOGUE") {
            for (let member of chat.members) {
                if (member.username !== username) {
                    return member.username;
                }
            }
            return chat.title;
        } else return chat.title
    }

    public static convertAvatarId(chat: ChatData | null, username: string | null): string | null {
        if (chat == null || username == null) return null
        if (chat.chatType === "DIALOGUE") {
            for (let member of chat.members) {
                if (member.username !== username) {
                    return member.avatarId;
                }
            }
            return chat.avatarId;
        } else return chat.avatarId
    }

    public static convertAvatar(chat: ChatData | null, username: string | null): string | null {
        if (chat == null || username == null) return null
        if (chat.chatType === "DIALOGUE") {
            for (let member of chat.members) {
                if (member.username !== username) {
                    return member.avatar;
                }
            }
            return chat.avatar;
        } else return chat.avatar;
    }
}
