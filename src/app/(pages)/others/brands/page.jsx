"use client";
import { primary } from "@/components/theme/theme";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGet } from "@/store/get";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Brands() {
  let { brands, getBrands, deleteBrands, postBrands, putBrands } = useGet();
  let [inpSearch, setInpSearch] = useState("");
  useEffect(() => {
    getBrands();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    postBrands(e.target["brand"].value);
  }
  function handleSubmit2(e, id) {
    e.preventDefault();
    putBrands(e.target["brand"].value, id);
  }
  return (
    <div className="p-4">
      <Input
        value={inpSearch}
        onChange={(e) => setInpSearch(e.target.value)}
        type="search"
        placeholder="Search..."
        className="w-[300px] mb-4 p-2 border rounded"
      />
      <div className="flex w-[1000px] justify-between md:flex-col-reverse md:ml-[-30px] md:w-auto md:gap-[30px]">
        <table className="w-[500px] border-collapse border border-gray-200 md:w-[350px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-200">Brand</th>
              <th className="p-2 border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands
              .filter((el) =>
                el.brandName.toLowerCase().includes(inpSearch.toLowerCase())
              )
              .map((el) => (
                <tr key={el.id} className="hover:bg-gray-50">
                  <td className="p-2 border border-gray-200">{el.brandName}</td>
                  <td className="p-2 border border-gray-200 flex space-x-2">
                    <div
                      onClick={() => deleteBrands(el.id)}
                      className="cursor-pointer text-red-500"
                      title="Delete Brand"
                    >
                      <Trash2 />
                    </div>
                    <Dialog>
                      <DialogTrigger
                        className="cursor-pointer"
                        title="Edit Brand"
                      >
                        <Pencil style={{ color: primary }} />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Brand</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => handleSubmit2(e, el.id)}
                          className="space-y-4"
                        >
                          <Input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Brand name"
                            name="brand"
                            defaultValue={el.brandName}
                          />
                          <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                          >
                            Save
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="p-6 w-[400px] bg-white rounded-lg shadow-md md:w-[350px]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add a Brand</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter brand name"
              name="brand"
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Brand
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
