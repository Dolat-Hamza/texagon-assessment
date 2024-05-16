import Image from "next/image";
import {Inter} from "next/font/google";
import Layout from "@/components/Shared/Layout";
import HeroSection from "@/components/HomePage/HeroSection";
import ProductGrid from "@/components/Products/ProductGrid";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
    return (
        <Layout>
            <div className={"w-full h-full flex flex-col "}>
                <HeroSection/>
                <ProductGrid/>
            </div>
        </Layout>
    );
}
