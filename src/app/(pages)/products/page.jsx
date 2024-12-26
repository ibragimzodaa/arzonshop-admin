"use client"
import { primary } from '@/components/theme/theme';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useProd } from '@/store/products';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

let fileAPI = "https://store-api.softclub.tj" + "/images/"

const Products = () => {
    let { products, getProd, deleteProd, postProd, putProd} = useProd();  
    const [checked, setChecked] = useState(false);
    let [delMod, setDelMod] = useState(false);
    let [modalAdd, setModalAdd] = useState(false);
    let [brand, setBrand] = useState("");
    let [color, setColor] = useState("");
    let [name, setName] = useState("");
    let [desc, setDesc] = useState("");
    let [idx, setIdx] = useState(null);
    let [inpSearch, setInpSearch] = useState("")


    useEffect(() => {
        getProd();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        const imageFiles = e.target.elements["image"].files;
        for (let file of imageFiles) {
            formData.append("Images", file);
        }
    
        formData.append("BrandId", parseInt(e.target.elements["brandId"].value, 10));
        formData.append("ColorId", parseInt(e.target.elements["colorId"].value, 10));
        formData.append("ProductName", e.target.elements["productName"].value);
        formData.append("Description", e.target.elements["description"].value);
        formData.append("Quantity", parseInt(e.target.elements["quantity"].value, 10));
        formData.append("Weight",  ""); // Optional
        formData.append("Size",  ""); // Optional
        formData.append("Code", e.target.elements["code"].value);
        formData.append("Price", parseFloat(e.target.elements["price"].value));
        formData.append("HasDiscount", e.target.elements["discount"].value === "true");
        // formData.append("DiscountPrice", parseFloat(e.target.elements["discountPrice"].value) || 0);
        formData.append("SubCategoryId", parseInt(e.target.elements["subCategoryId"].value, 10));
    
        try {
            await postProd(formData);
            alert("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error.response?.data || error.message);
            alert("Failed to add product. Please check the input and try again.");
        }
    };


    const handleSubmit2 = async (e, id) => {
      e.preventDefault();
  
      const formData = new FormData();
  
      const imageFiles = e.target.elements["image"].files;
      for (let file of imageFiles) {
          formData.append("Images", file);
      }
  
      formData.append("BrandId", parseInt(e.target.elements["brandId2"].value, 10));
      formData.append("ColorId", parseInt(e.target.elements["colorId2"].value, 10));
      formData.append("ProductName", e.target.elements["productName2"].value);
      formData.append("Description", e.target.elements["description2"].value);
      formData.append("Quantity", parseInt(e.target.elements["quantity2"].value, 10));
      formData.append("Weight",  ""); // Optional
      formData.append("Size",  ""); // Optional
      formData.append("Code", e.target.elements["code2"].value);
      formData.append("Price", parseFloat(e.target.elements["price2"].value));
      formData.append("HasDiscount", e.target.elements["discount2"].value === "true");
      // formData.append("DiscountPrice", parseFloat(e.target.elements["discountPrice"].value) || 0);
      formData.append("SubCategoryId", parseInt(e.target.elements["subCategoryId2"].value, 10));
  
      try {
          await putProd(formData, id);
          alert("Product added successfully!");
      } catch (error) {
          console.error("Error adding product:", error.response?.data || error.message);
          alert("Failed to add product. Please check the input and try again.");
      }
  };

  return (
      <div className=''>
          <h1 className="text-3xl font-semibold mb-6 ml-[50px] mt-[50px]">Списки товаров</h1>
          <Input value={inpSearch} onChange={(e) => setInpSearch(e.target.value)} type="search" placeholder="search..." className="w-[300px]"/>

          <Dialog>
              <DialogTrigger style={{backgroundColor: primary}} className='rounded-[5px] p-[10px] text-[white] ml-[1140px] mb-[50px]'>
                  Add product
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Product adding</DialogTitle>                                
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                      <Input type="file" name="image" id="" />
                      <Input type="number" className='border-[1px] border-[gray]' placeholder='BrandId' name="brandId" id="" />
                      <Input type="number" className='border-[1px] border-[gray]' placeholder='ColorId' name="colorId" id="" />
                      <Input type="text" className='border-[1px] border-[gray]' placeholder='Product Name' name="productName" id="" />
                      <Input type="text" className='border-[1px] border-[gray]' placeholder='Description' name="description" id="" />
                      <Input type="number" className='border-[1px] border-[gray]' placeholder='Quantity' name="quantity" id="" />
                      <Input type="text" className='border-[1px] border-[gray]' placeholder='Code' name="code" id="" />
                      <Input type="number" className='border-[1px] border-[gray]' placeholder='Price' name="price" id="" />
                      <select name="discount" id="" className='border-[1px] border-[gray]'>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                      </select>
                      <Input type="number" className='border-[1px] border-[gray]' placeholder='SubCategoryId' name="subCategoryId" id="" />
                      <Button type="submit" variant="primary">Submit</Button>
                  </form>
              </DialogContent>
          </Dialog>
          <div className="overflow-x-auto">
              <table className="w-[1200px] ml-[50px] table-auto border-collapse bg-white shadow-md rounded-lg">
                  <thead className="text-white" style={{backgroundColor: primary}}>
                      <tr>
                          <th className="py-3 px-4 text-left">
                              <Input type="checkbox" onChange={(e) => {setChecked(!checked)}} checked={checked} className="w-4 h-4" />
                          </th>

                          <th className="py-3 px-4 text-left">Товар</th>
                            <th className="py-3 px-4 text-left">Колвичество</th>
                            <th className="py-3 px-4 text-left">Категория</th>
                            <th className="py-3 px-4 text-left">Цена</th>
                            <th className="py-3 px-4 text-left">Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.filter((el)=> el.productName.toLowerCase().includes(inpSearch)).map((el) => {
                            return (
                                <tr key={el.id} className="border-t hover:bg-gray-100">
                                    <td className="py-3 px-4">
                                        <Input type="checkbox" checked={checked} onChange={(e) => {setChecked(!checked)}} className="w-4 h-4" />
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <Image src={fileAPI + el.image} width={50} height={50} alt={el.productName} className="rounded-lg" />
                                            <span className="ml-2">{el.productName}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{el.quantity}</td>
                                    <td className="py-3 px-4">{el.color}</td>
                                    <td className="py-3 px-4">{el.price} $</td>
                                    <td className="py-3 px-4">
                                        <Dialog>
                                            <DialogTrigger><Pencil className='text-blue-500 mr-[10px]' /></DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Product editing</DialogTitle>                                
                                                </DialogHeader>
                                                <form onSubmit={(e) => {handleSubmit2(e, el.id)}}>
                                                    <Input type="file" name="image" id="" />
                                                    <Input type="number" className='border-[1px] border-[gray]' placeholder='BrandId' name="brandId2" id="" />
                                                    <Input type="number" className='border-[1px] border-[gray]' placeholder='ColorId' name="colorId2" id="" />
                                                    <Input type="text" className='border-[1px] border-[gray]' placeholder='Product Name' name="productName2" id="" />
                                                    <Input type="text" value={desc} onChange={(e) => {setDesc(e.target.value)}} className='border-[1px] border-[gray]' placeholder='Description' name="description2" id="" />
                                                    <Input type="number" className='border-[1px] border-[gray]' placeholder='Quantity' name="quantity2" id="" />
                                                    <Input type="text" className='border-[1px] border-[gray]' placeholder='Code' name="code2" id="" />
                                                    <Input type="number" className='border-[1px] border-[gray]' placeholder='Price' name="price2" id="" />
                                                    <select name="discount2" id="" className='border-[1px] border-[gray]'>
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                    <Input type="number" className='border-[1px] border-[gray]' placeholder='SubCategoryId' name="subCategoryId2" id="" />

                                                    <Button type="submit" variant="primary">Submit</Button>
                                                </form>
                                            </DialogContent>
                                        
                                        </Dialog>
                                        <Dialog>
                                        <DialogTrigger>
                                          <Trash className="text-red-500" /> 
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                        
                                                <h1 className=''>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                                </h1>
                                                <div className=''>
                                                    <button onClick={() => {deleteProd(el.id)}}>
                                                    <Button type="button" variant="destructive">Delete</Button>
                                                    </button>
                                                    <DialogClose asChild>
                                                        <Button type="button" variant="secondary">
                                                        Close
                                                        </Button>
                                                    </DialogClose>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                        </Dialog>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Products
