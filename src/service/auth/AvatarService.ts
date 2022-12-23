import axios from "axios";

export const AvatarService = {
    loadAvatar: (avatarId: string | null | undefined, jwt: string | null | undefined) => {
        if (avatarId != null && avatarId !== "" && jwt != null) {
            const headers = {
                Authorization: "Bearer " + jwt,
            }
            return axios.get("https://xmess-gateway-service.jelastic.regruhosting.ru/document/" + avatarId, {
                headers: headers,
                responseType: "arraybuffer"
            }).then((res) => {
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                )
                return base64;
            })
        }
        return null;
    }
}
