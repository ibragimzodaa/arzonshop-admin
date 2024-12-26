import { axiosRequest } from "@/utils/axios";
import { create } from "zustand";

export const useColor = create((set, get) => ({
  colors: [],
  getColors: async () => {
    try {
      let { data } = await axiosRequest.get(`/Color/get-colors`);
      set({  colors: data.data });
    } catch (error) {
      console.error(error);
    }
  },
  deleteColors: async (id) => {
    try {
      await axiosRequest.delete(`/Color/delete-color?id=${id}`);
      get().getColors();
    } catch (error) {
      console.error(error);
    }
  },
  postColor: async (colorname) => {
    try {
        await axiosRequest.post(`/Color/add-color?ColorName=${colorname}`);  
        get().getColors();          
    } catch (error) {
        console.error(error);
    }
},
  putColors: async (colorName, id) => {
    try {
        await axiosRequest.put(`/Color/update-color?Id=${id}&ColorName=${colorName}`);  
        get().getColors();          
    } catch (error) {
        console.error(error);
    }
},
}));
