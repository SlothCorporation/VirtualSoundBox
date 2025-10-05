import AdminLayout from "@/components/AdminLayout";
import Input from "@/components/Form/Input";
import { useEffect, useState } from "react";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdDelete,
  MdEdit,
  MdSave,
} from "react-icons/md";
import {
  fetchMusicsPagination,
  updateMusic,
  deleteMusic,
} from "@/hooks/admin/music/api";
import { Toast } from "@/components/Toast/Toast";
import Modal from "@/components/Modal/Modal";

type Music = {
  id: number;
  name: string;
  artist: string;
  created_at: string;
  updated_at: string;
};

type MusicListBodyProps = {
  music: Music;
  fetchMusic: () => void;
};

function MusicListBody({ music, fetchMusic }: MusicListBodyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: music.name,
    artist: music.artist,
  });

  const handleSave = async () => {
    await updateMusic(music.id, editData);
    Toast({
      title: "成功",
      description: "楽曲の保存に成功しました。",
    });
    fetchMusic();
    setIsEdit(false);
  };

  const handleDelete = async () => {
    await deleteMusic(music.id);
    Toast({
      title: "成功",
      description: "楽曲の削除に成功しました。",
    });
    fetchMusic();
  };

  return (
    <tr key={music.id}>
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
      <td className="border px-4 py-2">
        {isEdit ? (
          <Input
            label=""
            value={editData.artist}
            onChange={(e) =>
              setEditData({ ...editData, artist: e.target.value })
            }
          />
        ) : (
          editData.artist
        )}
      </td>
      <td className="border px-4 py-2">
        {new Date(music.created_at).toLocaleString()}
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
              <p>
                {editData.name}/{editData.artist}を削除しますか？
              </p>
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

function MusicList() {
  const [musicList, setMusicList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchMusic = async () => {
    const res = await fetchMusicsPagination({ keyword, page });
    setMusicList(res.data);
    setLastPage(res.last_page);
  };

  useEffect(() => {
    fetchMusic();
  }, [page]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-full">
          <Input
            label=""
            placeholder="タイトル・アーティストで検索"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="text-nowrap">
          <button
            className="relative rounded border px-3.5 py-1.5 text-sm font-bold"
            onClick={() => fetchMusic()}
          >
            検索
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">楽曲名</th>
              <th className="border px-4 py-2">アーティスト</th>
              <th className="border px-4 py-2">登録日時</th>
              <th className="border px-4 py-2">操作</th>
              <th className="border px-4 py-2">削除</th>
            </tr>
          </thead>
          <tbody>
            {musicList.map((music: Music) => (
              <MusicListBody
                key={music.id}
                music={music}
                fetchMusic={fetchMusic}
              />
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
        <h1 className="mb-4 text-2xl font-bold">楽曲一覧</h1>
        <MusicList />
      </div>
    </AdminLayout>
  );
}

export default Page;
