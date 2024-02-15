import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All product categories
export const getAllProductCategory = createAsyncThunk(
  "productCategory/getAllProductCategory",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/product-category/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create category
export const createCategory = createAsyncThunk(
  "productCategory/createCategory",
  async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/product-category`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw new Error(error.response.data.message);
    }
  }
);

// get Single Category
export const getSInglePDCategory = createAsyncThunk(
  "productCategory/getSInglePDCategory",
  async (slug) => {
    try {
      const response = await axios.get(`${baseUrl}/product-category/${slug}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single Category
export const updateSinglePDCategory = createAsyncThunk(
  "productCategory/updateSinglePDCategory",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/product-category/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// delate a single Category
export const delateSinglePDCategory = createAsyncThunk(
  "productCategory/delateSinglePDCategory",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/product-category/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single Image
export const updateProductCategoryImage = createAsyncThunk(
  "brand/updateProductCategoryImage",
  async ({ id, imageId }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/product-category/image/${id}`,
        { imageId: imageId },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
