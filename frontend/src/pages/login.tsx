import Layout from "@/components/Layout";
import Input from "@/components/Form/Input";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import type { LoginSchema } from "@/schema/login";
import { loginSchema } from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiFetch } from "@/lib/api";
import { useSetAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";

function LoginForm() {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error(err);
        return;
      }
      const user = await res.json();
      setUser(user);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h1 className="mb-4 text-2xl font-bold">ログイン</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
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
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}

function Page() {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
}

export default Page;
