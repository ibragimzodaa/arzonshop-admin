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
      <div className='flex items-center justify-between max-w-[1200px] p-[10px] m-auto md:flex-wrap md:justify-center md:gap-10'>
            <Input value={inpSearch} onChange={(e) => setInpSearch(e.target.value)} type="search" placeholder="search..." className="w-[300px]"/>
         <Dialog>
              <DialogTrigger style={{backgroundColor: primary}} className='rounded-[5px] p-[10px] text-[white]'>
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
      </div>
      <div className="grid grid-cols-5 gap-8 md:grid-cols-1 md:ml-[50px]">
      {/* Search bar for filtering */}
      {categories
        .filter((el) => el.categoryName.toLowerCase().includes(inpSearch))
        .map((el) => (
          <div
            key={el.id}
            className="flex flex-col w-[200px] border border-gray-300 p-4 rounded shadow-sm hover:shadow-md"
          >
            <div className="mb-4">
              <Image
                width={100}
                height={100}
                src={`${apiImage}${el.categoryImage}`}
                alt={el.categoryName}
                className="rounded"
              />
              <h1 className="text-center font-semibold mt-2">{el.categoryName}</h1>
            </div>

            <div className="flex justify-between items-center">
              <div
                onClick={() => deleteCategory(el.id)}
                className="cursor-pointer p-2 rounded hover:bg-red-100"
              >
                <Trash2 className="text-red-600" />
              </div>

              <Dialog>
                <DialogTrigger>
                  <div className="cursor-pointer p-2 rounded hover:bg-gray-100">
                    <Pencil className="text-gray-600" />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => handleSubmit2(e, el.id)}>
                    <div className="mb-4">
                      <Input type="file" name="image" className="w-full" />
                    </div>
                    <div className="mb-4">
                      <Input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Category name"
                        name="subCategoryId"
                      />
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                      Submit
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
    </div>
    </div>
  )
}
