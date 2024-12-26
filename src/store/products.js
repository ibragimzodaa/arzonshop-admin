import { axiosRequest } from "@/utils/axios";
import { create } from "zustand";

export const useProd = create((set, get) => ({
  products: [],
  getProd: async () => {
    try {
      let { data } = await axiosRequest.get(`/Product/get-products`);
      set({ products: data.data.products });
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  },
  deleteProd: async (id) => {
    try {
      await axiosRequest.delete(`/Product/delete-product?id=${id}`);
      get().getProd();
    } catch (error) {
      console.error(error);
    }
  },
  postProd: async (formData) => {
    try {
        await axiosRequest.post("/Product/add-product", formData);  
        get().getProd();          
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        throw error;
    }
},
  putProd: async (editProducts, id) => {
    try {
        await axiosRequest.put(`/Product/update-product?Id=${id}`, editProducts);  
        get().getProd();          
    } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        throw error;
    }
},
}));
