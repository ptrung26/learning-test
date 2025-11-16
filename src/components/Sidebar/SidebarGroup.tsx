import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface Item {
    label: string;
    path: string;
}

interface Props {
    title: string;
    groupKey: string;
    isOpen: boolean;
    onToggle: (g: string) => void;
    items: Item[];
}

export default function SidebarGroup({ title, groupKey, isOpen, onToggle, items }: Props) {
    return (
        <div className="mb-4">
            <div
                onClick={() => onToggle(groupKey)}
                className="flex items-center justify-between cursor-pointer px-2 py-2 font-semibold text-gray-700 hover:bg-gray-100 rounded-md"
            >
                <span>{title}</span>
                {isOpen ? <CaretDownOutlined /> : <CaretRightOutlined />}
            </div>

            {isOpen && (
                <div className="mt-1 space-y-1 pl-4">
                    {items.map((it) => (
                        <Link
                            key={it.path}
                            to={it.path}
                            className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded-md"
                        >
                            {it.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
