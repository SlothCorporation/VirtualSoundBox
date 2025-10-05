import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Snack = {
  id: string;
  title: string;
  description: string;
  type: "success" | "error";
};

let idCounter = 0;

function ToastProvider() {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // クライアント側でマウント済みになる

    const handleEvent = (e: CustomEvent<Snack>) => {
      setSnacks((prev) => [...prev, e.detail]);
      setTimeout(() => {
        setSnacks((prev) => prev.filter((s) => s.id !== e.detail.id));
      }, 3000);
    };

    window.addEventListener("snackbar", handleEvent as EventListener);
    return () => {
      window.removeEventListener("snackbar", handleEvent as EventListener);
    };
  }, []);

  // サーバーサイドではレンダリングしないようにする
  if (!mounted) return null;

  return createPortal(
    <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
      {snacks.map(({ id, title, description, type }) => (
        <div
          key={id}
          className={`min-w-[250px] rounded px-4 py-3 shadow-lg transition-all duration-300
            ${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          <p className="font-bold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      ))}
    </div>,
    document.body,
  );
}

export function Toast({
  title,
  description,
  type = "success",
}: {
  title: string;
  description: string;
  type?: "success" | "error";
}) {
  const id = `snack-${idCounter++}`;
  const event = new CustomEvent("snackbar", {
    detail: { id, title, description, type },
  });
  if (typeof window !== "undefined") {
    window.dispatchEvent(event);
  }
}

export default ToastProvider;
