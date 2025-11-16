import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import BackToTop from "./BackToTop";
import "github-markdown-css/github-markdown.css";
import "../styles/markdown-responsive.css";

export default function AppLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </div>

            <BackToTop />
        </div>
    );
}