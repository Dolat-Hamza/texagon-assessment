import {Inter} from "next/font/google";
import Layout from "@/components/Shared/Layout";
import HeroSection from "@/components/HomePage/HeroSection";
import ProductGrid from "@/components/Products/ProductGrid";
import Cart from "@/components/Products/Cart";
import {useCart} from "@/context/CartContext";
import {useEffect} from "react";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
    const {getAllCartItems} = useCart();
    useEffect(() => {
        const items = getAllCartItems();
        console.log("Here are items", items);
    }, [getAllCartItems])
    return (
        <Layout>
            <div className={"w-full h-full flex flex-col gap-6 "}>
                <HeroSection/>
                <ProductGrid/>
                <Cart/>
            </div>
        </Layout>
    );
}
