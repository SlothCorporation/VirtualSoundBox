import type { Editor } from "@tiptap/react";

type HeaderSelectorProps = {
  editor: Editor;
};

function HeadingSelector({ editor }: HeaderSelectorProps) {
  const currentHeading = [1, 2, 3].find((level) =>
    editor.isActive("heading", { level }),
  );

  const headingOptions = [
    { label: "段落", level: undefined },
    { label: "H1", level: 1 },
    { label: "H2", level: 2 },
    { label: "H3", level: 3 },
  ];

  const onChangeHeading = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "undefined") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number(value) as 1 | 2 | 3;
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
    <select
      value={currentHeading ?? "undefined"}
      onChange={onChangeHeading}
      className="rounded border px-2 py-1"
    >
      {headingOptions.map(({ label, level }) => (
        <option key={label} value={String(level)}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default HeadingSelector;
