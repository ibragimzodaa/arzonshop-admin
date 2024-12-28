"use client";
import { primary } from "@/components/theme/theme";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useColor } from "@/store/color";
import { useGet } from "@/store/get";
import { useProd } from "@/store/products";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

let fileAPI = "https://store-api.softclub.tj" + "/images/";

const Products = () => {
  let { products, getProd, deleteProd, postProd, putProd } = useProd();
  const [checked, setChecked] = useState(false);
  let [inpSearch, setInpSearch] = useState("");
  let { colors, getColors } = useColor();
  let [desc, setDesc] = useState("");
  let { brands, getBrands, getSubCategory, subcategory } = useGet();

  useEffect(() => {
    getProd();
    getColors();
    getBrands();
    getSubCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const imageFiles = e.target.elements["image"].files;
    for (let file of imageFiles) {
      formData.append("Images", file);
    }

    formData.append(
      "BrandId",
      parseInt(e.target.elements["brandId"].value, 10)
    );
    formData.append(
      "ColorId",
      parseInt(e.target.elements["colorId"].value, 10)
    );
    formData.append("ProductName", e.target.elements["productName"].value);
    formData.append("Description", e.target.elements["description"].value);
    formData.append(
      "Quantity",
      parseInt(e.target.elements["quantity"].value, 10)
    );
    formData.append("Weight", ""); // Optional
    formData.append("Size", ""); // Optional
    formData.append("Code", e.target.elements["code"].value);
    formData.append("Price", parseFloat(e.target.elements["price"].value));
    formData.append(
      "HasDiscount",
      e.target.elements["discount"].value === "true"
    );
    // formData.append("DiscountPrice", parseFloat(e.target.elements["discountPrice"].value) || 0);
    formData.append(
      "SubCategoryId",
      parseInt(e.target.elements["subCategoryId"].value, 10)
    );

    try {
      await postProd(formData);
      alert("Product added successfully!");
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
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

    formData.append(
      "BrandId",
      parseInt(e.target.elements["brandId2"].value, 10)
    );
    formData.append(
      "ColorId",
      parseInt(e.target.elements["colorId2"].value, 10)
    );
    formData.append("ProductName", e.target.elements["productName2"].value);
    formData.append("Description", e.target.elements["description2"].value);
    formData.append(
      "Quantity",
      parseInt(e.target.elements["quantity2"].value, 10)
    );
    formData.append("Weight", ""); // Optional
    formData.append("Size", ""); // Optional
    formData.append("Code", e.target.elements["code2"].value);
    formData.append("Price", parseFloat(e.target.elements["price2"].value));
    formData.append(
      "HasDiscount",
      e.target.elements["discount2"].value === "true"
    );
    // formData.append("DiscountPrice", parseFloat(e.target.elements["discountPrice"].value) || 0);
    formData.append(
      "SubCategoryId",
      parseInt(e.target.elements["subCategoryId2"].value, 10)
    );

    try {
      await putProd(formData, id);
      alert("Product added successfully!");
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
      alert("Failed to add product. Please check the input and try again.");
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-6 ml-[50px] mt-[50px]">
        Списки товаров
      </h1>
      <div className="flex items-center justify-between max-w-[1200px] p-[20px] m-auto md:flex-wrap md:justify-center md:gap-10">
        <Input required
          value={inpSearch}
          onChange={(e) => setInpSearch(e.target.value)}
          type="search"
          placeholder="search..."
          className="w-[300px]"
        />
            <Link href="/postprod"> Add product</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-[1200px] ml-[50px] table-auto border-collapse bg-white shadow-md rounded-lg md:overflow-auto md:ml-[-7px]">
          <thead className="text-white" style={{ backgroundColor: primary }}>
            <tr>
              <th className="py-3 px-4 text-left">
                <Input required
                  type="checkbox"
                  onChange={(e) => {
                    setChecked(!checked);
                  }}
                  checked={checked}
                  className="w-4 h-4"
                />
              </th>

              <th className="py-3 px-4 text-left">Товар</th>
              <th className="py-3 px-4 text-left">Колвичество</th>
              <th className="py-3 px-4 text-left">Категория</th>
              <th className="py-3 px-4 text-left">Цена</th>
              <th className="py-3 px-4 text-left">Действие</th>
            </tr>
          </thead>
          <tbody>
            {products
              ?.filter((el) => el.productName.toLowerCase().includes(inpSearch))
              .map((el) => {
                return (
                  <tr key={el.id} className="border-t hover:bg-#ccc-100">
                    <td className="py-3 px-4">
                      <Input required
                        type="checkbox"
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Image
                          src={fileAPI + el.image}
                          width={50}
                          height={50}
                          alt={el.productName}
                          className="rounded-lg"
                        />
                        <span className="ml-2">{el.productName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{el.quantity}</td>
                    <td className="py-3 px-4">{el.color}</td>
                    <td className="py-3 px-4">{el.price} $</td>
                    <td className="py-3 px-4">
                      <Dialog>
                        <DialogTrigger>
                          <Pencil className="text-blue-500 mr-[10px]" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Product editing</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={(e) => {
                              handleSubmit2(e, el.id);
                            }}
                          >
                            <Input required type="file" name="image" id="" />
                            <select className="border-[2px] border-[#ccc] w-[220px] mb-[20px] p-[10px] mt-[20px]" name="brandId2" required>
                              <option value="">Brand Name</option>
                              {brands.map((el) => {
                                return (
                                  <option value={el.id} key={el.id}>
                                    {el.brandName}
                                  </option>
                                );
                              })}
                            </select>
                            <select className="border-[2px] border-[#ccc] w-[220px] mb-[20px] p-[10px] mt-[20px] ml-[20px]" name="colorId2" required>
                              <option value="">product Name</option>
                              {colors.map((el) => {
                                return (
                                  <option value={el.id} key={el.id}>
                                    {el.colorName}
                                  </option>
                                );
                              })}
                            </select>{" "}
                            <Input required
                              type="text"
                              className="border-[2px] border-[#ccc] mb-[20px]"
                              placeholder="Product Name"
                              name="productName2"
                              id=""
                            />
                            <Input required
                              type="text"
                              value={desc}
                              onChange={(e) => {
                                setDesc(e.target.value);
                              }}
                              className="border-[2px] border-[#ccc] mb-[20px]"
                              placeholder="Description"
                              name="description2"
                              id=""
                            />
                            <Input required
                              type="number"
                              className="border-[2px] border-[#ccc] mb-[20px]"
                              placeholder="Quantity"
                              name="quantity2"
                              id=""
                            />
                            <Input required
                              type="text"
                              className="border-[2px] border-[#ccc] mb-[20px]"
                              placeholder="Code"
                              name="code2"
                              id=""
                            />
                            <Input required
                              type="number"
                              className="border-[2px] border-[#ccc] mb-[20px]"
                              placeholder="Price"
                              name="price2"
                              id=""
                            />
                            <select
                              name="discount2"
                              id=""
                              className="border-[2px] border-[#ccc] mb-[20px] p-[10px]"
                            >
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                            <select className="border-[2px] border-[#ccc] mb-[20px] p-[10px] ml-[40px]" name="subCategoryId2" required>
                              <option value="">subcategory Name</option>
                              {subcategory.map((el) => {
                                return (
                                  <option value={el.id} key={el.id}>
                                    {el.subCategoryName}
                                  </option>
                                );
                              })}
                            </select>
                            <Button type="submit" className="bg-[#ccc] text-[black] hover:text-[white] w-[470px]">
                              Submit
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Trash
                        onClick={() => deleteProd(el.id)}
                        className="text-red-500"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
