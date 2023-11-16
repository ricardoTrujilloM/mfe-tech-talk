import Image from "next/image";
import { Inter } from "next/font/google";
import Card from "@/components/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className="flex-1 text-center py-2 m-2"></div>
      <div className="grid grid-cols-1 gap-4 justify-items-center h-48">
        <Card setSearchResult={() => {}} />
      </div>
    </div>
  );
}
