// components/editor/EditorSidebar.tsx
import React from "react";
import { StatusPanel } from "@/components/Editor/Sidebar/StatusPanel";
import { CategoryPanel } from "@/components/Editor/Sidebar/CategoryPanel";
import { TagPanel } from "@/components/Editor/Sidebar/TagPanel";
import { EyecatchPanel } from "@/components/Editor/Sidebar/EyecatchPanel";
import { ThumbnailPanel } from "@/components/Editor/Sidebar/ThumbnailPanel";
import ContentTypePanel from "@/components/Editor/Sidebar/ContentTypePanel";

function EditorSidebar() {
  return (
    <aside className="w-80">
      <StatusPanel />
      <ContentTypePanel />
      <EyecatchPanel />
      <CategoryPanel />
      <TagPanel />
      <ThumbnailPanel />
    </aside>
  );
}

export default EditorSidebar;
