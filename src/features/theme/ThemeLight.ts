import { Theme } from "./themeSlice";

import SettingsLight from "src/ui/img/SettingsLight.svg";
import Moon from "src/ui/img/Moon.svg";
import Sun from "src/ui/img/Sun.svg";
import AddChatLight from "src/ui/img/AddChatLight.svg";
import ArrowChatsLeftLight from "src/ui/img/ArrowChatsLeftLight.svg";
import ArrowChatsRightLight from "src/ui/img/ArrowChatsRightLight.svg";
import DotsLight from "src/ui/img/DotsVerticalLight.svg";
import FilesLight from "src/ui/img/PaperClipLight.svg";
import MediaLight from "src/ui/img/MediaLight.svg";
import Plane from "src/ui/img/Plane.svg";
import Dialogue from "src/ui/img/DialogueLight.svg";
import Group from "src/ui/img/GroupLight.svg";
import Audio from "src/ui/img/Audio.svg";
import Video from "src/ui/img/Video.svg";
import Close from "src/ui/img/CloseLight.svg";
import CloseGlobal from "src/ui/img/CloseGlobalLight.svg";
import Download from "src/ui/img/DownloadLight.svg";
import DotsDark from "../../ui/img/DotsVerticalDark.svg";
import FilesDark from "../../ui/img/PaperClipDark.svg";
import MediaDark from "../../ui/img/MediaDark.svg";
import Clear from "src/ui/img/ClearLight.svg";
import Delete from "src/ui/img/Delete.svg";
import Info from "src/ui/img/InfoLight.svg";
import Logout from "../../ui/img/Logout.svg";
import Check from "../../ui/img/CheckLight.svg";
import Edit from "../../ui/img/EditLight.svg";
import Copy from "../../ui/img/CopyLight.svg";

export const ThemeLight: Theme = {
    name: "DefaultLight",
    colors: {
        appBackground: "radial-gradient(circle at 200px 200px, #DDDDDD 0%, #CCCCCC 50%)",
        sectionBackground: "rgba(255, 255, 255, 0.7)",
        border: "#ffffff",
        borderSecond: "#ffffff",
        shadowMain: "rgba(0, 0, 0, 0.15)",
        textMain: "#000000",
        textSecond: "#555555",
        header: {
            background: "rgba(240, 240, 240, 0.4)",
            sectionBackground: "rgba(240, 240, 240, 0.6)"
        },
        document: {
            background: {
                default: "rgba(255, 255, 255, 0.7)",
                jpg: "rgba(69, 117, 237, 0.4)",
                jpeg: "rgba(69, 117, 237, 0.4)",
                png: "rgba(69, 117, 237, 0.4)",
                webp: "rgba(69, 117, 237, 0.4)",
                xlsx: "rgba(36, 183, 112, 0.4)",
                xls: "rgba(36, 183, 112, 0.4)",
                pdf: "rgba(230, 61, 61, 0.4)",
                txt: "rgba(255, 255, 255, 0.7)"
            },
            border: {
                default: "#ffffff",
                jpg: "#ffffff",
                jpeg: "#ffffff",
                png: "#ffffff",
                webp: "#ffffff",
                xlsx: "#ffffff",
                xls: "#ffffff",
                pdf: "#ffffff",
                txt: "#ffffff",
            },
            color: "rgba(85, 85, 85, 0.4)",
            nameColor: "#ffffff",
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
                background: "rgba(255, 255, 255, 0.4)",
                color: "#555555",
                shadow: "rgba(0, 0, 0, 0.10)"
            },
            withIcon: {
                background: "rgba(255, 255, 255, 0.7)"
            },
            third: {
                backgroundHover: "rgba(255, 255, 255, 0.7)",
                background: "rgba(255, 255, 255, 0)"
            }
        },
        toggle: {
            toggleWithIconBackground: "rgba(255, 255, 255, 0.7)",
            toggleWithIconBoxBackground: "rgba(255, 255, 255, 0.7)",
            text: {
                background: "rgba(255, 255, 255, 0.7)",
                box: {
                    backgroundActive: "rgba(200, 200, 200, 0.7)",
                    background: "rgba(255, 255, 255, 0.7)",
                    borderActive: "rgba(255, 255, 255, 1)",
                    border: "rgba(255, 255, 255, 0)",
                    color: "#555555"
                }
            }
        },
        input: {
            text: {
                background: "rgba(255, 255, 255, 0.7)",
                color: "#000000"
            }
        },
        loader: {
            simple: {
                color: "#555555"
            }
        },
        mainSection: {
            background: "rgba(240, 240, 240, 0.4)",
            border: "#ffffff",
            box: {
                background: "rgba(240, 240, 240, 0.7)",
                border: "#ffffff"
            }
        },
        secondSection: {
            background: "rgba(240, 240, 240, 0.5)"
        },
        infoSection: {
            background: "rgba(240, 240, 240, 0.4)",
            border: "#ffffff",
            box: {
                background: "rgba(240, 240, 240, 0.7)",
                border: "#ffffff"
            }
        },
        assistant: {
            icon: {
                background: "rgba(200, 200, 200, 0.7)",
                middleBackground: "rgba(240, 240, 240, 1)",
                activeBackground: "rgba(0, 153, 255, 1)",
                shadow: "rgba(0, 153, 255, 0.5)"
            }
        },
        logo: {
            mini: {
                firstBackground: "rgba(85, 85, 85, 0.4)",
                secondBackground: "#CCCCCC",
                placeholderColor: "rgb(187, 187, 187)"
            },
            xBackFirst: "#dedede",
            xBackSecond: "#D5D5D5",
        },
        authorization: {
            background: "rgba(240, 240, 240, 0)",
            side: {
                background: "rgba(240, 240, 240, 0.5)",
                container: {
                    background: "rgba(255, 255, 255, 0.4)",
                    spanColor: "#0099FF",
                    spanShadow: "rgba(0, 153, 255, 0.4)",
                    shadow: "rgba(0, 0, 0, 0.10)"
                }
            },
            main: {
                boxBackground: "rgba(240, 240, 240, 0.7)",
                border: "#ffffff"
            }
        },
        refresh: {
            background: "rgba(255, 255, 255, 0.5)",
            color: "#555555"
        },
        modal: {
            content: {
                background: "rgba(255, 255, 255, 0.7)",
                border: "#ffffff",
                mainColor: "#000000",
                secondColor: "#555555"
            }
        },
        client: {
            chats: {
                containerBackground: "rgba(255, 255, 255, 0)",
                border: "#ffffff",
                boxBackground: "rgba(255, 255, 255, 0)",
                header: {
                    border: "#ffffff",
                    background: "rgba(255, 255, 255, 0.7)",
                    buttonIcon: AddChatLight,
                    h2: {
                        color: "#555555"
                    }
                },
                list: {
                    border: "#ffffff",
                    background: "rgba(255, 255, 255, 0.7)",
                    chatItem: {
                        border: "#ffffff",
                        box: {
                            backgroundActive: "rgba(255, 255, 255, 0.4)",
                            background: "rgba(255, 255, 255, 0)",
                            borderActive: "rgba(255, 255, 255, 1)",
                            border: "rgba(255, 255, 255, 0)",
                            shadow: "rgba(0, 0, 0, 0)",
                            shadowActive: "rgba(0, 0, 0, 0.15)",
                            color: "#000000",
                            colorSecond: "#555555",
                            indicatorBackground: "#0099ff",
                            indicatorShadow: "#0099ff",
                        }
                    }
                }
            },
            chat: {
                background: "rgba(255, 255, 255, 0.5)",
                empty: {
                    color: "#000000",
                    background: "rgba(255, 255, 255, 0.5)",
                    border: "#ffffff"
                },
                header: {
                    dots: DotsDark,
                    titleColor: "#000000",
                    statusColor: "#555555",
                    statusActiveColor: "#0099ff",
                    border: "#bbbbbb"
                },
                list: {
                    border: "#ffffff",
                    message: {
                        otherBackground: "rgba(255, 255, 255, 0.7)",
                        selfBackground: "#0099ff",
                        color: "#000000",
                        shadow: "rgba(0, 0, 0, 0.15)",
                        self: "rgba(0, 153, 255, 0.5)",
                        selfColor: "#ffffff",
                        timeColor: "#555555"
                    }
                },
                input: {
                    files: FilesDark,
                    media: MediaDark,
                    plane: Plane,
                    inputBox: {
                        backgroundActive: "rgba(255, 255, 255, 0.3)",
                        background: "rgba(255, 255, 255, 0.3)",
                        border: "#ffffff"
                    }
                },
            },
            chatInfo: {
                box: {
                    border: "#ffffff",
                    background: "rgba(255, 255, 255, 0.7)",
                    mainColor: "#000000",
                    secondSection: "#555555"
                }
            }
        }
    },
    media: {
        SettingsIcon: SettingsLight,
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
        arrowLeft: ArrowChatsLeftLight,
        arrowRight: ArrowChatsRightLight,
        clear: Clear,
        delete: Delete,
        add: AddChatLight,
        info: Info,
        logout: Logout,
        check: Check,
        edit: Edit,
        copy: Copy
    }
}
