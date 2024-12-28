'use client'
import { Kanit } from "next/font/google";
import React from "react";
import { Input } from "../ui/input";
import { Bell, Search } from "lucide-react";
import { primary } from "../theme/theme";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Bolo() {
  let path = usePathname();

  if (path === "/") {
    return "";
  }

  return (
    <div
      className="block md:hidden" // This makes it hidden on phones and visible on larger screens.
      style={{
        backgroundColor: primary,
        position: "sticky",
        top: "0px",
        zIndex: "10",
      }}
    >
      <div className="flex items-center container justify-between sticky top-0 xs:hidden md:flex">
        <h1
          className={`${kanit.className} text-[25px] select-none cursor-pointer text-[white]`}
        >
          arzon shop
        </h1>
        <div className="flex items-center relative">
          <Search className="w-[20px] text-[white] absolute left-[7px]" />
          <Input
            placeholder="search..."
            type="search"
            className="w-[400px] placeholder:text-[white] relative pl-[30px] text-[white]"
          />
        </div>
        <div className="flex items-center w-[200px] justify-between">
          <Bell className="text-[white]" />
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
            <p className="text-[white] ml-[10px]">Randhir kumar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
