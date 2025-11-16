import { Typography } from "antd";
const { Title, Paragraph } = Typography;

export default function HeaderSection() {
  return (
    <>
      <Title level={3} className="!mb-2">SQL Procedure Generator</Title>
      <Paragraph className="text-gray-600 leading-relaxed mb-6">
        Công cụ tạo nhanh Stored Procedure từ câu SQL.  
        Hỗ trợ <strong>INSERT, UPDATE, SELECT, DELETE</strong> và tự động sinh tham số.
      </Paragraph>
    </>
  );
}
