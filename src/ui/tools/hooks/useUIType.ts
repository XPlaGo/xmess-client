import {useEffect, useState} from "react";

export default function useUIType(): string {
    const [UIType, setUIType] = useState<string>(window.innerWidth >= 1000 ? "pc" : (window.innerWidth >= 450 ? "tablet" : "mobile"));
    useEffect(() => {
        function handleResize() {
            setUIType(window.innerWidth >= 1100 ? "pc" : (window.innerWidth >= 450 ? "tablet" : "mobile"));
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return UIType;
}
