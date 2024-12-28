'use client'
import { Folder, House, ListOrdered, ShoppingBasket } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { primary } from '../theme/theme'
import Link from 'next/link'

export default function Header() {
    let path = usePathname()
    if(path == "/"){
      return ""
    }
  return (
    <div style={{backgroundColor: primary}}>
      <div className='z-20 shadow-2xl container sticky top-[60px] h-[695px] md:h-[250px]'>
        <Link href="/dashboard">
      <div style={path == "/dashboard" ? {backgroundColor:"white" , color: "black"} : {backgroundColor:"" , color: "white"}} className="flex items-center cursor-pointer p-[15px] rounded-lg">
      <House className=''/>
      <p className=' ml-[10px]'>Dashboard</p>
      </div>
      </Link>

     <Link href="/orders">
      <div  style={path == "/orders" ? {backgroundColor:"white" , color: "black"} : {backgroundColor:"" , color: "white"}} className="flex items-center cursor-pointer p-[15px] rounded-lg">
      <ListOrdered className=''/>
      <p className=' ml-[10px]'>Orders</p>
      </div>
     </Link>
     <Link href="/products">
      <div style={path == "/products" ? {backgroundColor:"white" , color: "black"} : {backgroundColor:"" , color: "white"}} className="flex items-center cursor-pointer p-[15px] rounded-lg">
      <ShoppingBasket className=''/>
      <p className=' ml-[10px]'>Products</p>
      </div>
     </Link>
     <Link href="/others">
      <div style={path == "/others" || path == "/others/banners" || path =="/others/brands" ? {backgroundColor:"white" , color: "black"} : {backgroundColor:"" , color: "white"}} className="flex items-center cursor-pointer p-[15px] rounded-lg">
      <Folder className=''/>
      <p className=' ml-[10px]'>Others</p>
      </div>
     </Link>
      </div>
    </div>
  )
}
