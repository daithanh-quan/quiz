import React, { useState } from "react";

import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Type,
  Underline as UnderlineIcon,
} from "lucide-react";

// Custom extension to add fontSize attribute
const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark(this.name, { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark(this.name, { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

// Component Tiptap Editor
const TiptapEditor = ({ value, onChange, placeholder }) => {
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false);

  const fontSizes = [
    { label: "Nhỏ", value: "12px" },
    { label: "Bình thường", value: "16px" },
    { label: "Trung bình", value: "18px" },
    { label: "Lớn", value: "24px" },
    { label: "Rất lớn", value: "32px" },
    { label: "Siêu lớn", value: "48px" },
  ];

  const editor = useEditor({
    extensions: [StarterKit, Superscript, Subscript, Underline, FontSize],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: "font-size: 16px;", // Default font size
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setShowFontSizeDropdown(false);
    if (showFontSizeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showFontSizeDropdown]);

  if (!editor)
    return (
      <div className="min-h-[140px] animate-pulse rounded-lg border border-gray-300 bg-gray-50 p-4">
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      </div>
    );

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300">
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 bg-gray-50 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-2 hover:bg-gray-200 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-2 hover:bg-gray-200 ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`rounded p-2 hover:bg-gray-200 ${editor.isActive("underline") ? "bg-gray-300" : ""}`}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-gray-300"></div>

        {/* Font Size Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowFontSizeDropdown(!showFontSizeDropdown);
            }}
            className="flex items-center gap-1 rounded p-2 hover:bg-gray-200"
            title="Font Size"
          >
            <Type size={18} />
            <span className="text-xs">▼</span>
          </button>

          {showFontSizeDropdown && (
            <div className="absolute left-0 top-full z-10 mt-1 min-w-[140px] rounded-lg border border-gray-300 bg-white shadow-lg">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    editor.chain().focus().setFontSize(size.value).run();
                    setShowFontSizeDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  style={{ fontSize: size.value }}
                >
                  {size.label}
                </button>
              ))}
              <div className="border-t border-gray-200"></div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  editor.chain().focus().unsetFontSize().run();
                  setShowFontSizeDropdown(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
              >
                Mặc định
              </button>
            </div>
          )}
        </div>

        <div className="mx-1 h-6 w-px bg-gray-300"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`rounded p-2 hover:bg-gray-200 ${editor.isActive("superscript") ? "bg-gray-300" : ""}`}
          title="Superscript (x²)"
        >
          <SuperscriptIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`rounded p-2 hover:bg-gray-200 ${editor.isActive("subscript") ? "bg-gray-300" : ""}`}
          title="Subscript (H₂O)"
        >
          <SubscriptIcon size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-gray-300"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded p-2 hover:bg-gray-200 ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded p-2 hover:bg-gray-200 ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose min-h-[200px] max-w-none p-4 focus:outline-none [&_.ProseMirror]:min-h-[150px] [&_.ProseMirror]:text-[16px]"
      />
    </div>
  );
};

export default TiptapEditor;
