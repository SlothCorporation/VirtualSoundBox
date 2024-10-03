import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';

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

type Props = {
  children: React.ReactNode;
}

function DataListWrapper({children}: Props) {
  return (
    <div>
      {children}
      <nav aria-label="Page navigation example">
        <ul className="flex items-center justify-end -space-x-px h-10 text-base">
          <li>
            <a href="#"
               className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                      d="M5 1 1 5l4 4"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="#"
               className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
          </li>
          <li>
            <a href="#"
               className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
            <a href="#" aria-current="page"
               className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
          </li>
          <li>
            <a href="#"
               className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
          </li>
          <li>
            <a href="#"
               className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
          </li>
          <li>
            <a href="#"
               className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"
                      d="m1 9 4-4-4-4"/>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <div className="mt-5 border rounded">
        <div>アーティスト</div>
        <DataListWrapper>
          <div className="p-5">
            {items.map((item) => (
              <Artist artist={item}/>
            ))}
          </div>
        </DataListWrapper>
      </div>
    </Layout>
  );
}
