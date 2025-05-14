import Layout from "@/components/Layout";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/userAtom";

function Page() {
  const user = useAtomValue(userAtom);
  return (
    <Layout auth={true}>
      <div>
        <h1>My Page</h1>
        <div>
          <p>名前：{user?.name}</p>
          <p>メールアドレス：{user?.email}</p>
          <p>プラン：{user?.plan}</p>
        </div>
      </div>
    </Layout>
  );
}

export default Page;
