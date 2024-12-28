import { axiosRequest } from "@/utils/axios";
import { create } from "zustand";

export const useGet = create((set,get) => ({
  categories : [],
  getCategories: async () => {
    try {
      const { data } = await axiosRequest.get(`/Category/get-categories`);
      set({categories:data.data})
    } catch (error) {
      console.error(error);
    }
  },
  subcategory: [],
  getSubCategory: async () => {
    try {
      const { data } = await axiosRequest.get(`/SubCategory/get-sub-category`);
      set({subcategory:data.data})
    } catch (error) {
      console.error(error);
    }
  },
  postCategory: async (obj) => {
    try {
      const { data } = await axiosRequest.post(`/Category/add-category`,obj);
      get().getCategories()
    } catch (error) {
      console.error(error);
    }
  },
  postBrands: async (obj) => {
    try {
      const { data } = await axiosRequest.post(`/Brand/add-brand?BrandName=${obj}`);
      get().getBrands()
    } catch (error) {
      console.error(error);
    }
  },
  putCategory: async (obj) => {
    try {
      const { data } = await axiosRequest.put(`/Category/update-category`,obj);
      get().getCategories()
    } catch (error) {
      console.error(error);
    }
  },
  putBrands: async (brandName,id) => {
    try {
      const { data } = await axiosRequest.put(`/Brand/update-brand?Id=${id}&BrandName=${brandName}`);
      get().getBrands()
    } catch (error) {
      console.error(error);
    }
  },
  deleteCategory: async (id) => {
    try {
      const { data } = await axiosRequest.delete(`/Category/delete-category?id=${id}`);
      get().getCategories()
    } catch (error) {
      console.error(error);
    }
  },
  deleteBrands: async (id) => {
    try {
      const { data } = await axiosRequest.delete(`/Brand/delete-brand?id=${id}`);
      get().getBrands()
    } catch (error) {
      console.error(error);
    }
  },
  brands: [],
  getBrands: async () => {
    try {
      const { data } = await axiosRequest.get(`/Brand/get-brands`);
      set({brands:data.data})
    } catch (error) {
      console.error(error);
    }
  },
}));
