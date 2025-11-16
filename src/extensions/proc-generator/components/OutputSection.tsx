import { Typography } from "antd";
const { Title } = Typography;

interface OutputSectionProps {
  output: string; 
}

export default function OutputSection({ output }: OutputSectionProps) {
  if (!output || output.trim() === "") return null;

  return (
    <div className="mt-10">
      <Title level={5}>Kết quả</Title>

      <pre className="bg-gray-900 text-green-200 p-4 rounded-lg overflow-auto whitespace-pre-wrap text-sm">
        {output}
      </pre>
    </div>
  );
}
