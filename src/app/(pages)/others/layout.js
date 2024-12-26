'use client'
import Header from "@/components/header/header";
import Bolo from "@/components/bolo/bolo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primary } from "@/components/theme/theme";


export default function Layout({ children }) {
  let path = usePathname()
  return (
    <div className="p-[40px]">
    <header className="flex w-[245px] justify-between mb-[50px]">
      <p><Link style={path == "/others" ? {backgroundColor: primary, color: "white", padding: "10px"} : {backgroundColor: "white", color: "black",padding: "10px"}} href="/others">Categories</Link></p>
      <p><Link style={path == "/others/brands" ? {backgroundColor: primary, color: "white", padding: "10px"} : {backgroundColor: "white", color: "black",padding: "10px"}} href="/others/brands">Brands</Link></p>
      <p><Link style={path == "/others/banners" ? {backgroundColor: primary, color: "white", padding: "10px"} : {backgroundColor: "white", color: "black",padding: "10px"}} href="/others/banners">Color</Link></p>
    </header>
    
    {children}
    </div>
  );
}
