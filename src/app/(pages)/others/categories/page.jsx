'use client'
import { primary } from '@/components/theme/theme'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useGet } from '@/store/get'
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

let apiImage = "https://store-api.softclub.tj" + "/images/"

export default function Categories() {
  let {getCategories,categories,postCategory,putCategory,deleteCategory} = useGet()
  let [inpSearch, setInpSearch] = useState("")
  useEffect(() => {
    getCategories()
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const imageFiles = e.target.elements["image"].files;
    for (let file of imageFiles) {
        formData.append("CategoryImage", file);
    }
    formData.append("categoryName", e.target.elements["subCategoryId"].value);

    try {
        await postCategory(formData);
        alert("Категория дабавит шид!");
    } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
        alert("Failed to add product. Please check the input and try again.");
    }
};
  const handleSubmit2 = async (e,id) => {
    e.preventDefault();

    const formData = new FormData();

    const imageFiles = e.target.elements["image"].files;
    for (let file of imageFiles) {
        formData.append("CategoryImage", file);
    }
    formData.append("categoryName", e.target.elements["subCategoryId"].value);

    try {
        await putCategory(formData,id);
    } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
        alert("Failed to add product. Please check the input and try again.");
    }
};

  return (
    <div>
            <Input value={inpSearch} onChange={(e) => setInpSearch(e.target.value)} type="search" placeholder="search..." className="w-[300px]"/>

         <Dialog>
              <DialogTrigger style={{backgroundColor: primary}} className='rounded-[5px] p-[10px] text-[white] ml-[1140px] mb-[50px]'>
                  Add category
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Category adding</DialogTitle>                                
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                      <Input type="file" name="image" id="" />
                      <Input type="text" className='border-[1px] border-[gray]' placeholder='category name' name="subCategoryId" id="" />
                      <Button type="submit" variant="primary">Submit</Button>
                  </form>
              </DialogContent>
          </Dialog>
    <div className='grid grid-cols-5 gap-[30px]'>
      {categories.filter((el)=> el.categoryName.toLowerCase().includes(inpSearch)).map((el) => {
        return <div key={el.id} className='flex w-[200px] justify-between border-[1px] border-[gray] p-[20px]'>
          <div>
          <Image width={100} height={100} src={apiImage + el.categoryImage} alt=''/>
          <h1>{el.categoryName}</h1>
          </div>
          <div>
          <div onClick={() => deleteCategory(el.id)} className="bg-[white] hover:bg-[white] cursor-pointer">
  <Trash2 className="text-[red]" />
</div>
          {/* <Button onClick={() => deleteCategory(el.id)} className="bg-[white] hover:bg-[white]">
            <Trash2 className='text-[red]' />
          </Button> */}
          <Dialog>
              <DialogTrigger>
              <div className="bg-[white] hover:bg-[white]"><Pencil style={{color:primary}} /></div>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Category adding</DialogTitle>                                
                  </DialogHeader>
                  <form onSubmit={(e) => {handleSubmit2(e, el.id)}}>
                      <Input type="file" name="image" id="" />
                      <Input type="text" className='border-[1px] border-[gray]' placeholder='category name' name="subCategoryId" id="" />
                      <Button type="submit" variant="primary">Submit</Button>
                  </form>
              </DialogContent>
          </Dialog>
      </div>
        </div>
      })}
    </div>
    </div>
  )
}
