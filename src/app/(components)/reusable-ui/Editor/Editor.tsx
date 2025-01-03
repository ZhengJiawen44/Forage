"use client";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import React, { useEffect } from "react";
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

import { mergeAttributes } from "@tiptap/core";
import MenuBar from "./MenuBar";

const Editor = () => {
  const content = `start configuring me!`;

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
    Code,
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
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      immediatelyRender={false}
      editorProps={{ attributes: { class: "p-4" } }}
    ></EditorProvider>
  );
};

export default Editor;
