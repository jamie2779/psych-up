import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";
import { renderTemplate } from "@/lib/utils";

interface QuillNoSSRReaderProps {
  content: string;
  data: Record<string, unknown>;
}

export const QuillNoSSRReader = ({ content, data }: QuillNoSSRReaderProps) => {
  const processedContent = renderTemplate(content, data);
  const Result = dynamic(
    async () => {
      const { default: QuillComponent } = await import("react-quill-new");
      const QuillWrapper = () => (
        <Box fontSize="s">
          <QuillComponent theme="bubble" readOnly value={processedContent} />
        </Box>
      );
      QuillWrapper.displayName = "QuillWrapper";

      return QuillWrapper;
    },
    {
      loading: () => (
        <Box fontSize="s" minH={100}>
          <div className="quill">
            <div className="ql-container ql-bubble ql-disabled">
              <div
                className="ql-editor"
                data-gramm="false"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>
          </div>
        </Box>
      ),
      ssr: false,
    }
  );

  return (
    <Box fontSize="s" minH={100}>
      <Result />
    </Box>
  );
};

export default function ArticleViewer({
  content,
  data,
}: {
  content: string;
  data: Record<string, string>;
}) {
  return (
    <Box fontSize="s">
      <QuillNoSSRReader content={content} data={data} />
    </Box>
  );
}
