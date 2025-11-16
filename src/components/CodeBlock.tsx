import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";


interface Props {
  children: string;
  language: string;
}

export default function CodeBlock({ children, language }: Props) {
  const [html, setHtml] = useState("");

  const firstLine = children.split("\n")[0].trim();
  const isRouteHeader = firstLine.match(/(GET|POST|PUT|PATCH|DELETE)\s+/);

  useEffect(() => {
    const highlight = async () => {
      try {
        const highlighted = await codeToHtml(
          isRouteHeader ? children.replace(firstLine, "").trim() : children.trim(),
          {
            lang: language,
            theme: "github-dark",
          }
        );
        setHtml(highlighted);
      } catch (err) {
        console.error(err);
        setHtml(`<pre><code>${children}</code></pre>`);
      }
    };

    highlight();
  }, [children, language]);

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-[#1e1e1e]">

      {isRouteHeader && (
        <div className="px-4 py-2 bg-gray-800 text-gray-200 text-sm font-mono border-b border-gray-700">
          {firstLine}
        </div>
      )}

      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="p-4 overflow-x-auto text-sm leading-6"
      />
    </div>
  );
}
