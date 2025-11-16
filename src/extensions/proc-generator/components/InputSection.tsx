import { Select, Input, Typography } from "antd";
import type { Dispatch, SetStateAction } from "react";

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

interface InputSectionProps {
    sqlInput: string;
    setSqlInput: Dispatch<SetStateAction<string>>;
    statementType: "AUTO" | "INSERT" | "UPDATE" | "SELECT" | "DELETE";
    setStatementType: Dispatch<SetStateAction<"AUTO" | "INSERT" | "UPDATE" | "SELECT" | "DELETE">>;
}

export default function InputSection({
    sqlInput,
    setSqlInput,
    statementType,
    setStatementType,
}: InputSectionProps) {
    return (
        <div className="space-y-4">
            <div>
                <Title level={5} className="!mb-1">Loại câu lệnh</Title>

                <Select
                    className="w-full max-w-xs"
                    value={statementType}
                    onChange={(v) =>
                        setStatementType(v as InputSectionProps["statementType"])
                    }
                >
                    <Option value="AUTO">AUTO (Detect)</Option>
                    <Option value="INSERT">INSERT</Option>
                    <Option value="UPDATE">UPDATE</Option>
                    <Option value="SELECT">SELECT</Option>
                    <Option value="DELETE">DELETE</Option>
                </Select>
            </div>

            <div>
                <Title level={5} className="!mb-1">Nhập câu SQL</Title>

                <TextArea
                    rows={5}
                    value={sqlInput}
                    onChange={(e) => setSqlInput(e.target.value)}
                    className="font-mono text-sm"
                />
            </div>
        </div>
    );
}
