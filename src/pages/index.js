import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Shared/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
  <Layout>
    <h1 className="text-3xl w-full h-full  font-bold underline">
      Hello world!
    </h1>
  </Layout>
  );
}
