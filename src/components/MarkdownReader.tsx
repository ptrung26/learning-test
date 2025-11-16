import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Spin, Image } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import CodeBlock from "./CodeBlock";

export default function MarkdownReader() {
    const { lesson, slug } = useParams();
    const [content, setContent] = useState<string | null>(null);
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (!lesson || !slug) return;

        const safeSlug = slug.replace(/[^a-zA-Z0-9_-]/g, "");

        import(`../lessons/${lesson}/${safeSlug}.md?raw`)
            .then((mod) => {
                const md = mod.default as string;
                setContent(md);

                const firstLine = md.split("\n")[0].trim();
                if (firstLine.startsWith("# ")) {
                    setTitle(firstLine.replace("# ", "").trim());
                } else {
                    setTitle(safeSlug);
                }
            })
            .catch((err) => {
                console.error("Lỗi tải bài học:", err);
                setContent("### Không tìm thấy bài học");
                setTitle("Lỗi");
            });
    }, [lesson, slug]);

    if (!content) {
        return (
            <div className="flex justify-center py-10">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Card title={title} className="max-w-none">
            <div className="markdown-body markdown-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      
                        code({ node, className, children }) {
                            const match = /language-(\w+)/.exec(className || "");
                            const isInline =
                                node?.position?.start.line === node?.position?.end.line;

                            if (!isInline && match) {
                                return (
                                    <CodeBlock language={match[1]}>
                                        {String(children)}
                                    </CodeBlock>
                                );
                            }

                            return (
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                                    {children}
                                </code>
                            );
                        },

                        
                        table({ children }) {
                            return (
                                <div className="overflow-x-auto my-6">
                                    <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                                        {children}
                                    </table>
                                </div>
                            );
                        },
                        th({ children }) {
                            return (
                                <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left font-medium">
                                    {children}
                                </th>
                            );
                        },
                        td({ children }) {
                            return (
                                <td className="border border-gray-200 px-4 py-2">
                                    {children}
                                </td>
                            );
                        },

                        hr() {
                            return <hr className="my-6 border-gray-300" />;
                        },

                        img({ src, alt }) {
                            return (
                                <Image
                                    src={src || ""}
                                    alt={alt}
                                    className="my-3 rounded-md"
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                        cursor: "zoom-in"
                                    }}
                                    preview={true}
                                />
                            );
                        }
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </Card>
    );
}
