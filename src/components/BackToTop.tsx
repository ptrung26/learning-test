import { useEffect, useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 200);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-[9999]
                flex items-center justify-center
                w-12 h-12 rounded-full
                bg-blue-600 text-white shadow-lg
                hover:bg-blue-700 active:scale-95
                transition-all duration-300
                ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
        >
            <ArrowUpOutlined style={{ fontSize: 20 }} />
        </button>
    );
}
