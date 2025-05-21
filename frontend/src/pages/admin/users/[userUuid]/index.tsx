import { useEffect } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { useForm } from "react-hook-form";
import { editUserSchema } from "@/schema/admin/users/edit";
import type { EditUserSchema } from "@/schema/admin/users/edit";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchUser, updateUser } from "@/hooks/admin/users/api";
import { useRouter } from "next/navigation";
import Input from "@/components/Form/Input";
import Dropdown from "@/components/Form/Select";
import { apiFetch } from "@/lib/api";

export default function EditUserPage() {
  const params = useParams();
  const userUuid = params?.userUuid;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      email: "",
      plan: "free",
      admin_flg: "0",
    },
  });

  useEffect(() => {
    (async () => {
      if (!userUuid) {
        return;
      }
      const user = await fetchUser(userUuid as string);
      reset({
        name: user.name,
        email: user.email,
        plan: user.plan ?? "free",
        admin_flg: user.admin_flg ?? "0",
      });
    })();
  }, [userUuid, reset]);

  const onSubmit = async (data: EditUserSchema) => {
    try {
      const res = await apiFetch(`/api/admin/users/${userUuid}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        console.error(body);
        return;
      }
      router.push("/admin/users");
    } catch (err) {
      console.error("ユーザーの更新に失敗しました", err);
    }

    // await updateUser(userUuid as string, formData);
    // router.push("/admin/users");
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-xl p-6">
        <h1 className="mb-4 text-2xl font-bold">ユーザー情報編集</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              label="名前"
              type="text"
              {...register("name")}
              readOnly={true}
            />
          </div>
          <div>
            <Input
              label="メールアドレス"
              type="text"
              {...register("email")}
              readOnly={true}
            />
          </div>
          <div>
            <Dropdown
              label="プラン"
              {...register("plan")}
              options={[
                { label: "free", value: "free" },
                { label: "premium", value: "premium" },
              ]}
            />
          </div>
          <div>
            <Dropdown
              label="管理者フラグ"
              {...register("admin_flg")}
              options={[
                { label: "有効", value: "1" },
                { label: "無効", value: "0" },
              ]}
            />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            更新
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
