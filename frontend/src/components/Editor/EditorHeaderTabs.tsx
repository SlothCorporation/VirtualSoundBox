import { useAtom } from "jotai";
import { editorModeAtom } from "@/atoms/editorArticleAtom";

function EditorHeaderTabs() {
  const [editorMode, setEditorMode] = useAtom(editorModeAtom);
  return (
    <div className="mb-4 flex items-center justify-end">
      <div className="flex space-x-2 border-b">
        <button
          onClick={() => setEditorMode("visual")}
          className={`px-2 pb-2 ${editorMode === "visual" ? "border-b-2 border-blue-500 font-bold" : ""}`}
        >
          ビジュアル
        </button>
        <button
          onClick={() => setEditorMode("html")}
          className={`px-2 pb-2 ${editorMode === "html" ? "border-b-2 border-blue-500 font-bold" : ""}`}
        >
          HTML
        </button>
      </div>
    </div>
  );
}

export default EditorHeaderTabs;
