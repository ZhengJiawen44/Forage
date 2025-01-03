import React, { useEffect } from "react";
import { GoBold } from "react-icons/go";
import { BsTypeH1 } from "react-icons/bs";
import { BsTypeH2 } from "react-icons/bs";
import { BsTypeH3 } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { FaListOl } from "react-icons/fa";
import { TbBlockquote } from "react-icons/tb";
import { LuCodeXml } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";

import { Toggle } from "@/app/(components)/reusable-ui/toggle";
import { useCurrentEditor } from "@tiptap/react";
const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;
  useEffect(() => {
    console.log("rendered");
  }, [editor.getHTML()]);

  return (
    <>
      {/* <button
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        Bold
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
      >
        H1
      </button> */}
      <Toggle asChild pressed={editor?.isActive("heading", { level: 1 })}>
        <BsTypeH1
          className="h-[3rem] w-[3rem]"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        />
      </Toggle>
      <Toggle asChild pressed={editor?.isActive("heading", { level: 2 })}>
        <BsTypeH2
          className="h-[3rem] w-[3rem]"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        />
      </Toggle>
      <Toggle asChild pressed={editor?.isActive("heading", { level: 3 })}>
        <BsTypeH3
          className="h-[3rem] w-[3rem]"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        />
      </Toggle>
      <Toggle asChild pressed={editor?.isActive("bold")}>
        <GoBold
          className="h-[3rem] w-[3rem]"
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
        />
      </Toggle>
      <Toggle asChild pressed={editor?.isActive("bulletList")}>
        <FaListUl
          className="h-[3rem] w-[3rem]"
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
        />
      </Toggle>

      <Toggle asChild pressed={editor?.isActive("orderedList")}>
        <FaListOl
          className="h-[3rem] w-[3rem]"
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
        />
      </Toggle>
      <Toggle asChild pressed={editor?.isActive("blockquote")}>
        <TbBlockquote
          className="h-[3rem] w-[3rem]"
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
          }}
        />
      </Toggle>
      <Toggle asChild pressed={editor?.isActive("codeBlock")}>
        <LuCodeXml
          className="h-[3rem] w-[3rem]"
          onClick={() => {
            editor.chain().focus().toggleCodeBlock().run();
          }}
        />
      </Toggle>
      <Toggle asChild>
        <IoImageOutline className="h-[3rem] w-[3rem]" />
      </Toggle>
    </>
  );
};

export default MenuBar;
