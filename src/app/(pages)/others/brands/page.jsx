"use client";
import { primary } from "@/components/theme/theme";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGet } from "@/store/get";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Brands() {
  let { brands, getBrands,deleteBrands,postBrands,putBrands } = useGet();
    let [inpSearch, setInpSearch] = useState("")
  useEffect(() => {
    getBrands();
  }, []);
  function handleSubmit(e) {
    e.preventDefault()
    postBrands(e.target["brand"].value)
  }
  function handleSubmit2(e,id) {
    e.preventDefault()
    putBrands(e.target["brand"].value,id)
  }
  return (
    <div>
            <Input value={inpSearch} onChange={(e) => setInpSearch(e.target.value)} type="search" placeholder="search..." className="w-[300px]"/>
       <Dialog>
              <DialogTrigger style={{backgroundColor: primary}} className='rounded-[5px] p-[10px] text-[white] ml-[1140px] mb-[50px]'>
                  Add brands
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Brand adding</DialogTitle>                                
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                      <Input type="text" className='border-[1px] border-[gray]' placeholder='brand name' name="brand" id="" />
                      <Button type="submit" variant="primary">Submit</Button>
                  </form>
              </DialogContent>
          </Dialog>

      <table>
        <thead>
          <tr>
          <th>Brands</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.filter((el)=> el.brandName.toLowerCase().includes(inpSearch)).map((el) => {
            return (
              <tr className="" key={el.id}>
                <td>{el.brandName}</td>
                <td>
                  {" "}
                  <div
                    onClick={() => deleteBrands(el.id)}
                    className="bg-[white] hover:bg-[white]"
                  >
                    <Trash2 className="text-[red]" />
                  </div>
                  <Dialog>
              <DialogTrigger>
              <div className="bg-[white] hover:bg-[white]">
                    <Pencil style={{ color: primary }} />
                  </div>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Brand edit</DialogTitle>                                
                  </DialogHeader>
                  <form onSubmit={(e) => {handleSubmit2(e,el.id)}}>
                      <Input type="text" className='border-[1px] border-[gray]' placeholder='brand name' name="brand" id="" />
                      <Button type="submit" variant="primary">Submit</Button>
                  </form>
              </DialogContent>
          </Dialog>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
