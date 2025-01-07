"use client";
import { EditorProvider } from "@tiptap/react";

import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Heading from "@tiptap/extension-heading";
import listItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Quote from "@tiptap/extension-blockquote";
import Code from "@tiptap/extension-code-block";
import Italic from "@tiptap/extension-italic";
import Strikethrough from "@tiptap/extension-strike";
import Image from "@tiptap/extension-image";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { mergeAttributes } from "@tiptap/core";
import MenuBar from "./MenuBar";
import { useRef } from "react";

interface EditorProps {
  richText?: React.RefObject<string>;
  error?: string | null;
}
const Editor: React.FC<EditorProps> = ({ richText, error }) => {
  type Levels = 1 | 2 | 3;

  const classes: Record<Levels, string> = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
  };
  const extensions = [
    Document,
    Text,
    Paragraph,
    Bold,
    listItem,
    Italic,
    Strikethrough,
    Image.configure({ HTMLAttributes: { class: "w-full" } }),
    Code.configure({ HTMLAttributes: { class: "bg-item p-4 rounded-[5px]" } }),
    BulletList.configure({ HTMLAttributes: { class: "list-disc pl-[3rem]" } }),
    OrderedList.configure({
      HTMLAttributes: { class: "list-decimal pl-[3rem]" },
    }),
    Quote.configure({
      HTMLAttributes: {
        class: " border-l-[3px] border-item-foreground pl-4 ml-4",
      },
    }),
    Heading.configure().extend({
      renderHTML({ node }) {
        const level = node.attrs.level;

        return [
          `h${level}`,
          mergeAttributes(this.options.HTMLAttributes, {
            class: `${classes[level]}`,
          }),
          0,
        ];
      },
    }),
  ];
  let allImages = useRef<string[]>([]);

  return (
    <>
      <EditorProvider
        slotBefore={<MenuBar />}
        content={richText?.current}
        extensions={extensions}
        immediatelyRender={false}
        onUpdate={async ({ editor }) => {
          //diffing for image deletion from s3
          let content = editor.getJSON().content;
          let images: string[] = [];

          content?.forEach(({ type, attrs }) => {
            if (type === "image" && !allImages.current.includes(attrs!.src)) {
              allImages.current.push(attrs!.src);
            }
            if (type === "image") {
              images.push(attrs!.src);
            }
          });

          // console.log("current: ", images);
          // console.log("All: ", allImages.current);
          let deleteObj = [];

          for (let i = 0; i < allImages.current.length; i++) {
            let remove = true;
            for (let j = 0; j < images.length; j++) {
              if (allImages.current[i] === images[j]) {
                remove = false;
              }
            }
            if (remove) {
              deleteObj.push(allImages.current[i]);
            }
          }
          // console.log(deleteObj);
          //diffing end
          if (deleteObj.length > 0) {
            const id = deleteObj[0].slice(-36);
            const res = await fetch(`/api/image/${id}`, { method: "DELETE" });
            console.log(deleteObj);
          }

          if (richText) richText.current = editor.getHTML();
        }}
        editorProps={{
          attributes: {
            class: "p-4 border-2 rounded-[5px] min-h-[50vh]",
          },
        }}
      ></EditorProvider>
      <p>{error}</p>
    </>
  );
};

export default Editor;
