"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useProd } from "@/store/products";
import { useGet } from "@/store/get";
import { useColor } from "@/store/color";

const postProductPage = () => {
  let { brands, getBrands, getSubCategory, subcategory } = useGet(); 
    let { colors, getColors } = useColor();
   let {postProd} = useProd()
  useEffect(() => {
    getBrands();
    getColors();
    getSubCategory();
  }, []);

  let router=useRouter()
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
    formData.append("Weight", parseInt(e.target.elements["weight"].value, 10));
    formData.append("Size", parseInt(e.target.elements["size"].value, 10));
    formData.append("Code", e.target.elements["code"].value);
    formData.append("Price", parseFloat(e.target.elements["price"].value));
    formData.append("HasDiscount", e.target.elements["discount"].value === "true");
    formData.append("DiscountPrice", parseFloat(e.target.elements["discountPrice"].value) || 0);
    formData.append("SubCategoryId", parseInt(e.target.elements["subCategoryId"].value, 10));

    try {
      await postProd(formData);
      router.push('/products')
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Failed to add product. Please check the input required and try again.");
    }
  };

  return (
    <div className="p-6 mx-auto w-[90%] h-[85vh] overflow-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 m-auto">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
        <div>
          <label className="block text-sm font-medium mb-1">Images</label>
          <input required
            type="file"
            name="image"
            className="w-full border border-gray-300 rounded-md p-2"
            multiple
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input required
            type="text"
            name="productName"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea required
            name="description"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter product description"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <select name="brandId" className="w-full border border-gray-300 rounded-md p-2">
              {brands.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.brandName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <select name="colorId" className="w-full border border-gray-300 rounded-md p-2">
              {colors.map((e) => (
                <option value={e.id} key={e.id} className="flex w-[150px] items-center justify-between">
                  {e.colorName}
                  {/* <span style={{background: e?.colorName?.toLowerCase()}} className="w-[20px] h-[20px] rounded-[50%]" /> */}
                </option>
              ))}
            </select>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input required
              type="number"
              name="price"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Discount Price</label>
            <input required
              type="number"
              name="discountPrice"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter discount price"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input required
              type="number"
              name="quantity"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Code</label>
            <input required
              type="text"
              name="code"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter product code"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <input required
              type="number"
              name="size"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter size"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Weight</label>
            <input required
              type="number"
              name="weight"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter weight"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Has Discount?</label>
          <select name="discount" className="w-full border border-gray-300 rounded-md p-2">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">Subcategory</label>
          <select name="subCategoryId" className="w-full border border-gray-300 rounded-md p-2">
            {subcategory.map((e) => (
              <option value={e.id} key={e.id}>
                {e.subCategoryName}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default postProductPage;
