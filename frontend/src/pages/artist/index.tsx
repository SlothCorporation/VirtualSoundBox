import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

const items = [
  {
    id: 1,
    name: "アーティストA",
    description: "紹介文",
    image: "/art.jpeg",
    tag: [
      {
        id: 1,
        name: "グループA",
      },
      {
        id: 2,
        name: "グループB",
      },
    ],
  },
  {
    id: 2,
    name: "アーティストB",
    description: "紹介文",
    image: "/art.jpeg",
    tag: [
      {
        id: 1,
        name: "グループA",
      },
      {
        id: 2,
        name: "グループB",
      },
    ],
  },
  {
    id: 3,
    name: "アーティストA",
    description: "紹介文",
    image: "/art.jpeg",
    tag: [
      {
        id: 1,
        name: "グループA",
      },
      {
        id: 2,
        name: "グループB",
      },
    ],
  },
];
type ArtistType = {
  id: number;
  name: string;
  description: string;
  image: string;
  tag: {
    id: number;
    name: string;
  }[];
};

function Artist({ artist }: { artist: ArtistType }) {
  return (
    <Link href={`artist/${artist.id}`}>
      <div className="flex rounded border">
        <div>
          <Image
            src={artist.image}
            alt="artist.name"
            width={100}
            height={100}
          />
        </div>
        <div className="p-2">
          <div className="w-full border-b">{artist.name}</div>
          <div>{artist.description}</div>
        </div>
      </div>
    </Link>
  );
}

type Props = {
  children: React.ReactNode;
};

function DataListWrapper({ children }: Props) {
  return (
    <div>
      {children}
      <nav aria-label="Page navigation example">
        <ul className="flex h-10 items-center justify-end -space-x-px text-base">
          <li>
            <a
              href="#"
              className="ms-0 flex h-10 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="size-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="z-10 flex h-10 items-center justify-center border border-blue-300 bg-blue-50 px-4 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-10 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="size-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
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
      <div className="mt-5 rounded border">
        <div>アーティスト</div>
        <DataListWrapper>
          <div className="p-5">
            {items.map((item, index) => (
              <Artist key={index} artist={item} />
            ))}
          </div>
        </DataListWrapper>
      </div>
    </Layout>
  );
}
