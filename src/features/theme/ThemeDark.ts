import { Theme } from "./themeSlice";

import SettingsDark from "src/ui/img/SettingsDark.svg";
import Moon from "src/ui/img/Moon.svg";
import Sun from "src/ui/img/Sun.svg";
import AddChatDark from "src/ui/img/AddChatDark.svg";
import ArrowChatsLeftDark from "src/ui/img/ArrowChatsLeftDark.svg";
import ArrowChatsRightDark from "src/ui/img/ArrowChatsRightDark.svg";
import DotsDark from "src/ui/img/DotsVerticalDark.svg";
import FilesDark from "src/ui/img/PaperClipDark.svg";
import MediaDark from "src/ui/img/MediaDark.svg";
import Plane from "src/ui/img/Plane.svg";
import Dialogue from "src/ui/img/DialogueDark.svg";
import Group from "src/ui/img/GroupDark.svg";
import Audio from "src/ui/img/Audio.svg";
import Video from "src/ui/img/Video.svg";
import Close from "src/ui/img/CloseDark.svg";
import Download from "src/ui/img/DownloadDark.svg";
import Clear from "src/ui/img/ClearDark.svg";
import Delete from "src/ui/img/Delete.svg";
import Info from "src/ui/img/InfoDark.svg";
import CloseGlobal from "../../ui/img/CloseGlobalLight.svg";
import Logout from "../../ui/img/Logout.svg";
import Check from "../../ui/img/CheckDark.svg";
import Edit from "../../ui/img/EditDark.svg";
import Copy from "../../ui/img/CopyDark.svg";

export const ThemeDark: Theme = {
    name: "DefaultDark",
    colors: {
        appBackground: "radial-gradient(circle at 300px 170px, #444444 0%, #111111 50%)",
        sectionBackground: "rgba(17, 17, 17, 0.7)",
        border: "#333333",
        borderSecond: "#222222",
        shadowMain: "rgba(0, 0, 0, 0.25)",
        textMain: "#ffffff",
        textSecond: "#bbbbbb",
        header: {
            background: "rgba(17, 17, 17, 0.7)",
            sectionBackground: "rgba(17, 17, 17, 0)"
        },
        document: {
            background: {
                default: "rgba(51, 51, 51, 0.4)",
                jpg: "rgba(38, 61, 120, 0.4)",
                jpeg: "rgba(38, 61, 120, 0.4)",
                png: "rgba(38, 61, 120, 0.4)",
                webp: "rgba(38, 61, 120, 0.4)",
                xlsx: "rgba(38, 120, 80, 0.4)",
                xls: "rgba(38, 120, 80, 0.4)",
                pdf: "rgba(120, 38, 38, 0.4)",
                txt: "rgba(51, 51, 51, 0.4)"
            },
            border: {
                default: "#333333",
                jpg: "rgb(49, 63, 94)",
                jpeg: "rgb(49, 63, 94)",
                png: "rgb(49, 63, 94)",
                webp: "rgb(49, 63, 94)",
                xlsx: "rgb(69, 120, 95)",
                xls: "rgb(69, 120, 95)",
                pdf: "rgb(109, 55, 55)",
                txt: "rgb(51, 51, 51)",
            },
            color: "rgba(255, 255, 255, 0.4)",
            nameColor: "#bbbbbb",
            close: {
                background: "rgba(0, 0, 0, 0.4)",
                border: "rgba(0, 0, 0, 0)"
            },
        },
        button: {
            accent: {
                background: "#0099FF",
                color: "#ffffff",
                shadow: "rgba(0, 153, 255, 0.4)"
            },
            simple: {
                background: "rgba(51, 51, 51, 0.4)",
                color: "#bbbbbb",
                shadow: "rgba(0, 0, 0, 0.25)"
            },
            withIcon: {
                background: "rgba(51, 51, 51, 0.4)"
            },
            third: {
                backgroundHover: "rgba(51, 51, 51, 0.4)",
                background: "rgba(51, 51, 51, 0)"
            }
        },
        toggle: {
            toggleWithIconBackground: "rgba(51, 51, 51, 0.4)",
            toggleWithIconBoxBackground: "#111111",
            text: {
                background: "rgba(51, 51, 51, 0.4)",
                box: {
                    backgroundActive: "rgba(17, 17, 17, 1)",
                    background: "rgba(17, 17, 17, 0)",
                    borderActive: "rgba(51, 51, 51, 1)",
                    border: "rgba(51, 51, 51, 0)",
                    color: "#bbbbbb"
                }
            }
        },
        check: {
            background: "rgba(51, 51, 51, 0.4)",
        },
        input: {
            text: {
                background: "rgba(51, 51, 51, 0.4)",
                color: "#ffffff"
            }
        },
        loader: {
            simple: {
                color: "#333333"
            }
        },
        mainSection: {
            background: "rgba(0, 0, 0, 0.5)",
            border: "#333333",
            box: {
                background: "rgba(34, 34, 34, 0.6)",
                border: "#333333"
            }
        },
        secondSection: {
            background: "rgba(17, 17, 17, 0.7)"
        },
        infoSection: {
            background: "rgba(0, 0, 0, 0.5)",
            border: "#333333",
            box: {
                background: "rgba(34, 34, 34, 0.6)",
                border: "#333333"
            }
        },
        assistant: {
            icon: {
                background: "rgba(51, 51, 51, 0.4)",
                middleBackground: "rgba(16, 16, 16, 0.4)",
                activeBackground: "rgba(0, 153, 255, 1)",
                shadow: "rgba(0, 153, 255, 0.5)"
            }
        },
        logo: {
            mini: {
                firstBackground: "rgba(51, 51, 51, 0.4)",
                secondBackground: "#111111",
                placeholderColor: "rgb(187, 187, 187)"
            },
            xBackFirst: "#333333",
            xBackSecond: "#2a2a2a",
        },
        authorization: {
            background: "rgba(17, 17, 17, 0.7)",
            side: {
                background: "rgba(17, 17, 17, 0)",
                container: {
                    background: "rgba(51, 51, 51, 0.4)",
                    spanColor: "#0099FF",
                    spanShadow: "rgba(0, 153, 255, 0.4)",
                    shadow: "rgba(0, 0, 0, 0.25)"
                }
            },
            main: {
                boxBackground: "rgba(34, 34, 34, 0.6)",
                border: "#333333"
            }
        },
        refresh: {
            background: "rgba(17, 17, 17, 0.7)",
            color: "#ffffff"
        },
        modal: {
            content: {
                background: "rgba(17, 17, 17, 0.5)",
                border: "#333333",
                mainColor: "#ffffff",
                secondColor: "#bbbbbb"
            }
        },
        client: {
            chats: {
                containerBackground: "rgba(0, 0, 0, 0.5)",
                border: "#333333",
                boxBackground: "rgba(0, 0, 0, 0.5)",
                header: {
                    border: "#333333",
                    background: "rgba(34, 34, 34, 0.6)",
                    buttonIcon: AddChatDark,
                    h2: {
                        color: "#bbbbbb"
                    }
                },
                list: {
                    border: "#333333",
                    background: "rgba(34, 34, 34, 0.6)",
                    chatItem: {
                        border: "#222222",
                        box: {
                            backgroundActive: "rgba(51, 51, 51, 0.4)",
                            background: "rgba(51, 51, 51, 0)",
                            borderActive: "rgba(51, 51, 51, 1)",
                            border: "rgba(51, 51, 51, 0)",
                            shadow: "rgba(0, 0, 0, 0)",
                            shadowActive: "rgba(0, 0, 0, 0.25)",
                            color: "#ffffff",
                            colorSecond: "#bbbbbb",
                            indicatorBackground: "#0099ff",
                            indicatorShadow: "#0099ff",
                        }
                    }
                }
            },
            chat: {
                background: "rgba(17, 17, 17, 0.7)",
                empty: {
                    color: "#777777",
                    background: "rgba(51, 51, 51, 0.4)",
                    border: "#333333"
                },
                header: {
                    dots: DotsDark,
                    titleColor: "#ffffff",
                    statusColor: "#bbbbbb",
                    statusActiveColor: "#0099ff",
                    border: "#000000"
                },
                list: {
                    border: "#333333",
                    message: {
                        otherBackground: "rgba(51, 51, 51, 0.4)",
                        selfBackground: "#0099ff",
                        shadow: "rgba(0, 0, 0, 0.25)",
                        self: "rgba(0, 153, 255, 0.5)",
                        color: "#ffffff",
                        selfColor: "#ffffff",
                        timeColor: "#bbbbbb"
                    }
                },
                input: {
                    files: FilesDark,
                    media: MediaDark,
                    plane: Plane,
                    inputBox: {
                        backgroundActive: "rgba(51, 51, 51, 0.4)",
                        background: "rgba(51, 51, 51, 0)",
                        border: "#333333"
                    }
                },
            },
            chatInfo: {
                box: {
                    border: "#333333",
                    background: "rgba(34, 34, 34, 0.6)",
                    mainColor: "#ffffff",
                    secondSection: "#bbbbbb"
                }
            }
        }
    },
    media: {
        SettingsIcon: SettingsDark,
        toggle: {
            ThemeDark: Moon,
            ThemeLight: Sun
        },
        dialogue: {
            noAvatar: Dialogue
        },
        group: {
            noAvatar: Group
        },
        chatInfo: {
            calls: {
                audio: Audio,
                video: Video,
            },
            members: {
                dots: DotsDark
            }
        },
        close: Close,
        closeGlobal: CloseGlobal,
        download: Download,
        arrowLeft: ArrowChatsLeftDark,
        arrowRight: ArrowChatsRightDark,
        clear: Clear,
        delete: Delete,
        add: AddChatDark,
        info: Info,
        logout: Logout,
        check: Check,
        edit: Edit,
        copy: Copy
    }
}
