import dynamic from "next/dynamic";

interface QuillNoSSRReaderProps {
  content: string;
  data: Record<string, string>;
}

const replacePlaceholders = (content: string, data: Record<string, string>) => {
  return content.replace(
    /{{(.*?)}}/g,
    (_, key) => data[key.trim()] || `{{${key}}}`
  );
};

export const QuillNoSSRReader = ({ content, data }: QuillNoSSRReaderProps) => {
  const processedContent = replacePlaceholders(content, data);

  const Result = dynamic(
    async () => {
      const { default: QuillComponent } = await import("react-quill-new");
      return () => (
        <QuillComponent theme="bubble" readOnly value={processedContent} />
      );
    },
    {
      loading: () => (
        <div className="quill">
          <div className="ql-container ql-bubble ql-disabled">
            <div
              className="ql-editor"
              data-gramm="false"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </div>
        </div>
      ),
      ssr: false,
    }
  );

  return <Result />;
};

export default function ArticleViewer({
  content,
  data,
}: {
  content: string;
  data: Record<string, string>;
}) {
  return <QuillNoSSRReader content={content} data={data} />;
}
