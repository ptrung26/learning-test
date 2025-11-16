import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function HomePage() {
    return (
        <div className="px-6 py-10">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Chào mừng đến <span className="text-blue-600">Tester Learning</span> 🚀
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                    Nền tảng học tập dành cho Tester với các bài học trực quan, dễ hiểu và công cụ hỗ trợ tự động hóa.
                    Học kiểm thử từ cơ bản đến nâng cao bằng cách đọc tài liệu, thực hành công cụ và xem ví dụ thực tế.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

                <Link
                    to="/lesson/test-types/intro"
                    className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 hover:shadow-md transition block"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">📘 Bài học Tester</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Học các khái niệm cơ bản như Test Types, SDLC/STLC, Functional Testing, Non-functional…
                    </p>
                    <span className="text-blue-600 font-medium flex items-center">
                        Xem bài học <ArrowRightOutlined className="ml-1" />
                    </span>
                </Link>

                <Link
                    to="/extensions/proc-generator"
                    className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 hover:shadow-md transition block"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">🧩 Extensions</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Công cụ hỗ trợ Tester & Developer: sinh Stored Procedure, phân tích SQL, tạo dữ liệu test…
                    </p>
                    <span className="text-blue-600 font-medium flex items-center">
                        Xem công cụ <ArrowRightOutlined className="ml-1" />
                    </span>
                </Link>

                <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 Lộ trình Tester</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Roadmap gợi ý để bạn học kiểm thử từ A → Z theo trình tự hợp lý nhất.
                    </p>
                    <span className="text-gray-400 text-sm italic">Sắp ra mắt…</span>
                </div>
            </div>
        </div>
    );
}
