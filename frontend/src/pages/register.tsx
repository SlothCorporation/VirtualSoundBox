import { useForm } from "react-hook-form";
import type { RegisterSchema } from "@/schema/register";
import { registerSchema } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import Input from "@/components/Form/Input";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/router";
import { useSetAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";

function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: RegisterSchema) => {
    setError("");
    try {
      const res = await apiFetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body.message || "登録に失敗しました");
        return;
      }
      await router.push("/email/verify/sent");
    } catch (err) {
      setError("登録に失敗しました");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h1 className="mb-4 text-2xl font-bold">ユーザー登録</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <div>
          <Input
            label="名前"
            type="text"
            placeholder="名前を入力してください"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div>
          <Input
            label="メールアドレス"
            type="email"
            placeholder="メールアドレスを入力してください"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <div>
          <Input
            label="パスワード"
            type="password"
            placeholder="パスワードを入力してください"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>
        <div>
          <Input
            label="パスワード (確認)"
            type="password"
            placeholder="パスワードを再度入力してください"
            {...register("password_confirmation")}
            error={errors.password_confirmation?.message}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          登録
        </button>
      </form>
    </div>
  );
}

function Page() {
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
}

export default Page;
