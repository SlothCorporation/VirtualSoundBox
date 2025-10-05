import AdminLayout from "@/components/AdminLayout";
import { useEffect, useState } from "react";
import type { Tag } from "@/hooks/admin/tags/api";
import {
  fetchTagsPagination,
  updateTag,
  deleteTag,
} from "@/hooks/admin/tags/api";
import Input from "@/components/Form/Input";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdDelete,
  MdEdit,
  MdSave,
} from "react-icons/md";
import { Toast } from "@/components/Toast/Toast";
import Modal from "@/components/Modal/Modal";

type TagListBodyProps = {
  tag: Tag;
  fetchTags: () => void;
};

function TagListBody({ tag, fetchTags }: TagListBodyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: tag.name,
  });

  const handleSave = async () => {
    await updateTag(tag.id, editData);
    Toast({
      title: "成功",
      description: "タグの保存に成功しました。",
    });
    fetchTags();
    setIsEdit(false);
  };

  const handleDelete = async () => {
    await deleteTag(tag.id);
    Toast({
      title: "成功",
      description: "タグの削除に成功しました。",
    });
    fetchTags();
  };

  return (
    <tr key={tag.id}>
      <td className="border px-4 py-2">
        {isEdit ? (
          <Input
            label=""
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />
        ) : (
          editData.name
        )}
      </td>
      <td className="border px-4 py-2">{tag.slug}</td>
      <td className="border px-4 py-2">{tag.count}</td>
      <td className="border px-4 py-2">
        {new Date(tag.created_at).toLocaleString()}
      </td>
      <td className="border px-4 py-2">
        {new Date(tag.updated_at).toLocaleString()}
      </td>
      <td className="border px-4 py-2">
        {isEdit ? (
          <button className="rounded p-2 hover:bg-gray-200">
            <MdSave size={18} onClick={() => handleSave()} />
          </button>
        ) : (
          <button
            className="rounded p-2 hover:bg-gray-200"
            onClick={() => setIsEdit(true)}
          >
            <MdEdit size={18} />
          </button>
        )}
      </td>
      <td className="border px-4 py-2">
        <button
          className="rounded p-2 hover:bg-gray-200"
          onClick={() => setIsOpen(true)}
        >
          <MdDelete size={18} />
        </button>
        {isOpen && (
          <Modal title="削除" onClose={() => setIsOpen(false)}>
            <div className="flex flex-col gap-4">
              <p>{editData.name}を削除しますか？</p>
              <div className="flex w-full justify-end">
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                  onClick={() => handleDelete()}
                >
                  削除
                </button>
              </div>
            </div>
          </Modal>
        )}
      </td>
    </tr>
  );
}

function TagList() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchTags = async () => {
    const res = await fetchTagsPagination({ keyword, page });
    setTags(res.data);
    setLastPage(res.meta.last_page);
  };

  useEffect(() => {
    fetchTags();
  }, [page]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-full">
          <Input
            label=""
            placeholder="タグ名で検索"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="text-nowrap">
          <button
            className="relative rounded border px-3.5 py-1.5 text-sm font-bold"
            onClick={() => fetchTags()}
          >
            検索
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">タグ名</th>
              <th className="border px-4 py-2">slug</th>
              <th className="border px-4 py-2">記事紐付け数</th>
              <th className="border px-4 py-2">登録日時</th>
              <th className="border px-4 py-2">更新日時</th>
              <th className="border px-4 py-2">操作</th>
              <th className="border px-4 py-2">削除</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <TagListBody key={tag.id} tag={tag} fetchTags={fetchTags} />
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end gap-2 pt-4">
          <button
            className="rounded border p-1.5"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            <MdArrowBackIos size={18} />
          </button>
          <span className="text-sm text-gray-600">
            {page} / {lastPage}
          </span>
          <button
            className="rounded border p-1.5"
            onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
            disabled={page === lastPage}
          >
            <MdArrowForwardIos size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">タグ一覧</h1>
        <TagList />
      </div>
    </AdminLayout>
  );
}

export default Page;
