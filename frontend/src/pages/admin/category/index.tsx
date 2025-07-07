import AdminLayout from "@/components/AdminLayout";
import {
  deleteCategory,
  fetchCategory,
  createCategory,
} from "@/hooks/admin/category/api";
import { useEffect, useState } from "react";
import type { Category } from "@/hooks/admin/category/api";
import { MdDelete } from "react-icons/md";
import Modal from "@/components/Modal/Modal";
import { Toast } from "@/components/Toast/Toast";
import { useForm } from "react-hook-form";
import type { Category as CategoryInput } from "@/schema/admin/category";
import { category } from "@/schema/admin/category";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Input from "@/components/Form/Input";

type CreateCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchCategories: () => void;
};

function CreateCategoryModal({
  isOpen,
  onClose,
  fetchCategories,
}: CreateCategoryModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(category),
  });

  const onSubmit = async (data: CategoryInput) => {
    await createCategory(data);
    Toast({
      title: "成功",
      description: "カテゴリーの作成に成功しました。",
    });
    reset();
    onClose();
    fetchCategories();
  };

  if (!isOpen) return null;

  return (
    <Modal title="カテゴリー作成" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Input
            label="カテゴリー名"
            type="text"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div>
          <Input
            label="スラッグ"
            type="text"
            {...register("slug")}
            error={errors.slug?.message}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            作成
          </button>
        </div>
      </form>
    </Modal>
  );
}

type CategoryListBodyProps = {
  category: Category;
  fetchCategories: () => void;
};

function CategoryListBody({
  category,
  fetchCategories,
}: CategoryListBodyProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    await deleteCategory(String(category.id));
    Toast({
      title: "成功",
      description: "カテゴリーの削除に成功しました。",
    });
    fetchCategories();
  };

  return (
    <tr key={category.id}>
      <td className="border px-4 py-2">{category.name}</td>
      <td className="border px-4 py-2">{category.slug}</td>
      <td className="whitespace-nowrap border px-4 py-2 text-right">
        {category.count}
      </td>
      <td className="whitespace-nowrap border px-4 py-2">
        {dayjs(category.created_at).format("YYYY/MM/DD HH:mm")}
      </td>
      <td className="whitespace-nowrap border px-4 py-2">
        {dayjs(category.updated_at).format("YYYY/MM/DD HH:mm")}
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
              <p>{category.name}を削除しますか？</p>
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

function CategoryList() {
  const [category, setCategory] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchCategories = async () => {
    const res = await fetchCategory();
    setCategory(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <div className="text-nowrap">
          <button
            className="rounded bg-blue-500 px-3.5 py-1.5 text-white"
            onClick={() => setIsOpen(true)}
          >
            + 新規作成
          </button>
          <CreateCategoryModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            fetchCategories={fetchCategories}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">カテゴリー名</th>
              <th className="border px-4 py-2">slug</th>
              <th className="w-px whitespace-nowrap border px-4 py-2">
                記事紐付け数
              </th>
              <th className="w-px border px-4 py-2">登録日時</th>
              <th className="w-px border px-4 py-2">更新日</th>
              <th className="w-px border px-4 py-2">削除</th>
            </tr>
          </thead>
          <tbody>
            {category.map((item: Category) => (
              <CategoryListBody
                key={item.id}
                category={item}
                fetchCategories={fetchCategories}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Page() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">カテゴリー</h1>
        <CategoryList />
      </div>
    </AdminLayout>
  );
}

export default Page;
