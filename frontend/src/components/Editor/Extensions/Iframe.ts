import { Node, mergeAttributes } from "@tiptap/core";

export const Iframe = Node.create({
  name: "iframe",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: "" },
      width: { default: "100%" },
      height: { default: "400" },
      allowfullscreen: {
        default: true,
        parseHTML: () => true,
      },
    };
  },

  parseHTML() {
    return [{ tag: "iframe" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["iframe", mergeAttributes(HTMLAttributes)];
  },
});
