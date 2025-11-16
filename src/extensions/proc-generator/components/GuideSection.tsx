import { Typography } from "antd";
const { Title } = Typography;

export default function GuideSection() {
    return (
        <div className="mt-12 space-y-10">

            <div>
                <Title level={4}>📘 Hướng dẫn</Title>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Tự detect loại câu lệnh nếu chọn AUTO</li>
                    <li>Hỗ trợ INSERT nhiều dòng VALUES</li>
                    <li>Tự sinh tham số và kiểu dữ liệu</li>
                    <li>Sinh lệnh CALL đầy đủ</li>
                </ul>
            </div>

            <div>
                <Title level={4}>Ví dụ</Title>
                <pre className="bg-gray-50 p-4 border rounded text-sm">
                    INSERT INTO users(name, age) VALUES
                    ('A',20), ('B',22), ('C',25);
                </pre>
            </div>

        </div>
    );
}
