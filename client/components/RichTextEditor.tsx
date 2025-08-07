// components/RichTextEditor.tsx
import { cn } from "@/lib/utils";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's default styles

// Import Quill's core and snow theme CSS for proper content styling

// Optionally, you can add your own CSS to further style the editor content
// For example, you can create a file like styles/quill-custom.css and import it here
// import "@/styles/quill-custom.css";

// If you want to use Tailwind classes for the content, you need to override Quill's default CSS
// This is not trivial and requires custom CSS. For now, Quill's default styles will be used.

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["clean"], // remove formatting
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "align",
];

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start typing...",
  className = "",
}) => {
  return (
    <div className={cn("w-full", className)}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="dark:ql-dark"
        style={{ minHeight: "200px" }}
      />
    </div>
  );
};

export default RichTextEditor;
