import * as React from "react";

export interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return <div className="prose prose-sm dark:prose-invert max-w-none">{content}</div>;
}

export default MarkdownRenderer;
