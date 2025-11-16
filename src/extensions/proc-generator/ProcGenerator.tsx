import { useState } from "react";
import { Card, Button } from "antd";

import HeaderSection from "./components/HeaderSection";
import InputSection from "./components/InputSection";
import OutputSection from "./components/OutputSection";
import GuideSection from "./components/GuideSection";

import { detectStatementType } from "./utils/parser";
import {
    generateInsert,
    generateDelete,
    generateSelect,
    generateUpdate,
} from "./utils/generator";

export default function SqlProcedureGenerator() {
    const [sqlInput, setSqlInput] = useState("");
    const [statementType, setStatementType] = useState<
        "AUTO" | "INSERT" | "UPDATE" | "SELECT" | "DELETE"
    >("AUTO");
    const [output, setOutput] = useState("");

    function generate() {
        if (!sqlInput.trim()) {
            setOutput("-- Vui lòng nhập SQL");
            return;
        }

        const clean = sqlInput.trim().replace(/;$/, "");

        const type: "INSERT" | "UPDATE" | "SELECT" | "DELETE" | "UNKNOWN" =
            statementType === "AUTO"
                ? detectStatementType(clean)
                : statementType;

        const table =
            clean.match(/(into|update|from)\s+(\w+)/i)?.[2] || "MyTable";

        let generated:
            | {
                proc: string;
                call: string;
            }
            | undefined;

        if (type === "INSERT") generated = generateInsert(clean, table);
        else if (type === "UPDATE") generated = generateUpdate(clean, table);
        else if (type === "SELECT") generated = generateSelect(clean, table);
        else if (type === "DELETE") generated = generateDelete(clean, table);

        if (!generated) {
            setOutput("-- Không hỗ trợ câu lệnh này");
            return;
        }

        setOutput(`${generated.proc}\n\n-- CALL:\n${generated.call}`);
    }

    return (
        <div className="w-full bg-white pb-20">
            <div className="max-w-6xl mx-auto px-2 sm:px-4 pt-4 sm:pt-8">
                <Card
                    className="
                    border border-gray-200 shadow-sm rounded-lg 
                    p-3 sm:p-6 md:p-8
                "
                >
                    <HeaderSection />

                    <InputSection
                        sqlInput={sqlInput}
                        setSqlInput={setSqlInput}
                        statementType={statementType}
                        setStatementType={setStatementType}
                    />

                    <Button type="primary" className="mt-4" onClick={generate}>
                        Generate Procedure
                    </Button>

                    <OutputSection output={output} />

                    <GuideSection />
                </Card>
            </div>
        </div>
    );
}
