import React, { useEffect } from "react";
import { GoBold } from "react-icons/go";
import { BsTypeH1 } from "react-icons/bs";
import { BsTypeH2 } from "react-icons/bs";
import { BsTypeH3 } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { FaListOl } from "react-icons/fa";
import { TbBlockquote } from "react-icons/tb";
import { LuCodeXml } from "react-icons/lu";
import { GoItalic } from "react-icons/go";
import { GoStrikethrough } from "react-icons/go";
import ImagePicker from "./ImagePicker";

import { Toggle } from "@/app/(components)/reusable-ui/toggle";
import { useCurrentEditor } from "@tiptap/react";
const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div className="flex justify-center mb-4 gap-1">
      <Toggle
        asChild
        pressed={editor?.isActive("heading", { level: 1 })}
        title="heading1"
      >
        <BsTypeH1
          className="h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        />
      </Toggle>
      <Toggle
        asChild
        pressed={editor?.isActive("heading", { level: 2 })}
        title="heading2"
      >
        <BsTypeH2
          className="h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        />
      </Toggle>
      <Toggle
        asChild
        pressed={editor?.isActive("heading", { level: 3 })}
        title="heading3"
      >
        <BsTypeH3
          className="h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        />
      </Toggle>
      <Toggle asChild pressed={editor?.isActive("bold")} title="bold">
        <GoBold
          className="h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white"
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
        />
      </Toggle>
      <Toggle
        asChild
        pressed={editor?.isActive("bulletList")}
        title="bullet list"
      >
        <FaListUl
          className="h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white"
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
        />
      </Toggle>

      <Toggle
        asChild
        pressed={editor?.isActive("orderedList")}
        title="ordered list"
      >
        <FaListOl
          className="h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white"
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
        />
      </Toggle>
      <Toggle
        asChild
        pressed={editor?.isActive("blockquote")}
        title="block quote"
      >
        <TbBlockquote
          className="h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white"
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
          }}
        />
      </Toggle>
      <Toggle
        asChild
        pressed={editor?.isActive("codeBlock")}
        title="code block"
      >
        <LuCodeXml
          className="h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white"
          onClick={() => {
            editor.chain().focus().toggleCodeBlock().run();
          }}
        />
      </Toggle>
      <Toggle asChild pressed={editor?.isActive("italic")} title="code block">
        <GoItalic
          className="h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white"
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
          }}
        />
      </Toggle>
      <Toggle asChild pressed={editor?.isActive("strike")} title="code block">
        <GoStrikethrough
          className="h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white"
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
          }}
        />
      </Toggle>
      <ImagePicker />
    </div>
  );
};

export default MenuBar;
