import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { SlArrowRight } from "react-icons/sl";

const items = [
  {
    id: 1,
    name: "アーティストA",
    description: "紹介文",
    image: "/art.jpeg",
    tag: [{
      id: 1,
      name: "グループA",
    }, {
      id: 2,
      name: "グループB"
    }]
  },
  {
    id: 2,
    name: "アーティストB",
    description: "紹介文",
    image: "/art.jpeg",
    tag: [{
      id: 1,
      name: "グループA",
    }, {
      id: 2,
      name: "グループB"
    }]
  },
  {
    id: 3,
    name: "アーティストA",
    description: "紹介文",
    image: "/art.jpeg",
    tag: [{
      id: 1,
      name: "グループA",
    }, {
      id: 2,
      name: "グループB"
    }]
  }
]
type ArtistType = {
  id: number,
  name: string,
  description: string,
  image: string,
  tag: {
    id: number,
    name: string
  }[]
}

function Artist({artist}: {artist: ArtistType}) {
  return (
    <Link href={`artist/${artist.id}`}>
      <div className="border rounded flex">
        <div><Image src={artist.image} alt="artist.name" width={100} height={100}/></div>
        <div className="p-2">
          <div className="border-b w-full">{artist.name}</div>
          <div>{artist.description}</div>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <Layout>
      <div className="mt-5 border rounded">
        <div>アーティスト</div>
        <div className="p-5">
          {items.map((item) => (
            <Artist artist={item} />
          ))}
        </div>
        <div className="flex justify-end border-t">
          <Link href="/artist">
            <div className="flex items-center text-xs p-1">もっと見る<SlArrowRight/></div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
