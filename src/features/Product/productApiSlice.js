import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All Product
export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/product/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create Product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/product`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get a single Product
export const getSingleProduct = createAsyncThunk(
  "Product/getSingleProduct",
  async (slug) => {
    try {
      const response = await axios.get(`${baseUrl}/product/${slug}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single Product
export const updateSingleProduct = createAsyncThunk(
  "Product/updateSingleProduct",
  async ({ id, formData }) => {
    try {
      const response = await axios.patch(`${baseUrl}/product/${id}`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single Product
export const updateSingleProductImage = createAsyncThunk(
  "Product/updateSingleProductImage",
  async ({ id, imageId }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/product/${id}`,
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

// delate a single Product
export const delateSingleProduct = createAsyncThunk(
  "Product/delateSingleProduct",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/product/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
