import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    [{ color: [] }, { background: [] }], // 색상 및 배경색 옵션 추가

    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],

    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "color", // 추가
  "background", // 추가
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "image",
  "video",
];

interface ArticleEditorProps {
  article: string;
  setSource: (content: string) => void;
  setArticle: (content: string) => void;
  isLoading: boolean;
}

export default function ArticleEditor({
  article,
  setArticle,
  setSource,
  isLoading,
}: ArticleEditorProps) {
  return (
    <QuillNoSSRWrapper
      modules={modules}
      formats={formats}
      theme="snow"
      value={article}
      onChange={(content) => {
        setArticle(content);
        setSource(content);
      }}
      readOnly={isLoading}
      placeholder="본문을 입력해주세요."
    />
  );
}
