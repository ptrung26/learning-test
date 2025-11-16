import { Layout, Menu, Grid } from "antd";
import * as Icons from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import rawMenu from "../../config/menu.json";
import type { MenuItem } from "../../types/menu";
import type { ItemType } from "antd/es/menu/interface";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const menuData = rawMenu as MenuItem[];

const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent /> : null;
};

const generateMenuItems = (items: MenuItem[]): ItemType[] =>
    items.map((item): ItemType => ({
        key: item.key,
        label: (
            <span
                className="truncate block text-[14px] text-gray-700"
                title={item.label}
            >
                {item.label}
            </span>
        ),
        icon: item.icon && (
            <span className="text-gray-500">{getIcon(item.icon)}</span>
        ),
        children: item.children ? generateMenuItems(item.children) : undefined,
    }));

export default function Sidebar() {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    if (!isMobile) {
        return (
            <Sider
                width={260}
                theme="light"
                className="border-r border-gray-200 bg-white !min-h-screen"
                collapsible={false}
            >
                <div className="px-6 py-6 border-b border-gray-200">
                    <span className="font-semibold text-gray-800 text-[16px]">
                        Tester Learning
                    </span>
                </div>

                <Menu
                    mode="inline"
                    items={generateMenuItems(menuData)}
                    selectedKeys={[location.pathname]}
                    onClick={({ key }) => navigate(key)}
                    style={{
                        borderRight: "none",
                        background: "white",
                        padding: "12px 12px",
                    }}
                    className="
                        [&_.ant-menu-item]:rounded-md
                        [&_.ant-menu-item]:px-4
                        [&_.ant-menu-item]:py-[6px]
                        [&_.ant-menu-item]:mx-1
                        [&_.ant-menu-item:hover]:bg-gray-100
                        [&_.ant-menu-item-selected]:bg-blue-50
                        [&_.ant-menu-item-selected]:text-blue-600
                        [&_.ant-menu-item-selected]:font-medium
                    "
                />
            </Sider>
        );
    }

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed left-4 top-4 z-[2000] w-10 h-10 rounded-full bg-white shadow flex items-center justify-center border border-gray-200"
                >
                    <Icons.MenuOutlined />
                </button>
            )}

            {open && (
                <div
                    className="
                        fixed inset-0 bg-black/40 backdrop-blur-sm z-[1500]
                        animate-fadeIn
                    "
                    onClick={() => setOpen(false)}
                />
            )}

            <Sider
                width={260}
                theme="light"
                collapsedWidth={0}
                collapsed={!open}
                onCollapse={(v) => setOpen(!v)}
                className={`
                    fixed left-0 top-0 z-[2001] h-screen 
                    border-r border-gray-200 bg-white
                    transform transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                    ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
                `}
            >
                <div className="px-6 py-6 border-b border-gray-200 flex items-center justify-between">
                    <span className="font-semibold text-gray-800 text-[16px]">
                        Tester Learning
                    </span>
                    <button onClick={() => setOpen(false)}>
                        <Icons.CloseOutlined />
                    </button>
                </div>

                <Menu
                    mode="inline"
                    items={generateMenuItems(menuData)}
                    selectedKeys={[location.pathname]}
                    onClick={({ key }) => {
                        navigate(key);
                        setOpen(false);
                    }}
                    style={{
                        borderRight: "none",
                        background: "white",
                        padding: "12px 12px",
                    }}
                    className="
                        [&_.ant-menu-item]:rounded-md
                        [&_.ant-menu-item]:px-4
                        [&_.ant-menu-item]:py-[6px]
                        [&_.ant-menu-item]:mx-1
                        [&_.ant-menu-item:hover]:bg-gray-100
                        [&_.ant-menu-item-selected]:bg-blue-50
                        [&_.ant-menu-item-selected]:text-blue-600
                        [&_.ant-menu-item-selected]:font-medium
                    "
                />
            </Sider>
        </>
    );
}
