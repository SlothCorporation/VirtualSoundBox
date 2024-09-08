import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { SlArrowRight } from "react-icons/sl";

export default function Home() {
  return (
    <Layout>
      <div>これから実装</div>
      <div className="border rounded">
        <div>トピック</div>
        <div className="p-5">
          <div className="border rounded flex">
            <div><Image src="/art.jpeg" width={100} height={100}/></div>
            <div className="p-2">
              <div className="border-b w-full">アーティスト名</div>
              <div>紹介文</div>
            </div>
          </div>
          <div className="border rounded flex">
            <div><Image src="/art.jpeg" width={100} height={100}/></div>
            <div className="p-2">
              <div className="border-b w-full">アーティスト名</div>
              <div>紹介文</div>
            </div>
          </div>
          <div className="border rounded flex">
            <div><Image src="/art.jpeg" width={100} height={100}/></div>
            <div className="p-2">
              <div className="border-b w-full">アーティスト名</div>
              <div>紹介文</div>
            </div>
          </div>
          <div className="border rounded flex">
            <div><Image src="/art.jpeg" width={100} height={100}/></div>
            <div className="p-2">
              <div className="border-b w-full">アーティスト名</div>
              <div>紹介文</div>
            </div>
          </div>
          <div className="border rounded flex">
            <div><Image src="/art.jpeg" width={100} height={100}/></div>
            <div className="p-2">
              <div className="border-b w-full">アーティスト名</div>
              <div>紹介文</div>
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t">
          <Link href="/articles">
            <div className="flex items-center text-xs p-1">もっと見る<SlArrowRight/></div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
