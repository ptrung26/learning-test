import { Card, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../components/CodeBlock";

export default function LessonPage() {
    const { slug } = useParams(); 
    const [content, setContent] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        if (!slug) return;

        import(`../lessons/${slug}.md`)
            .then((module) => {
                const mdText = module.default;
                setContent(mdText);

                const firstLine = mdText.split("\n")[0];
                if (firstLine.startsWith("# ")) {
                    setTitle(firstLine.replace("# ", ""));
                } else {
                    setTitle(slug);
                }
            })
            .catch(() => {
                setContent(null);
                setTitle("Không tìm thấy bài học");
            });
    }, [slug]);

    if (!content) {
        return (
            <div className="flex justify-center py-10">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Card title={title} className="mx-6 my-4">
            <ReactMarkdown
                components={{
                    code({ node, className, children }) {
                        const match = /language-(\w+)/.exec(className || "");
                        const isInline =
                            node?.position?.start.line === node?.position?.end.line;

                        if (!isInline && match) {
                            return (
                                <CodeBlock language={match[1]}>{String(children)}</CodeBlock>
                            );
                        }

                        return (
                            <code className="bg-gray-200 px-1 py-0.5 rounded">
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </Card>
    );
}
