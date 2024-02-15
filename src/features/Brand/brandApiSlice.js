import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All brand
export const getAllBrand = createAsyncThunk("brand/getAllBrand", async () => {
  try {
    const response = await axios.get(`${baseUrl}/brand/all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Create a brand
export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/brand`, data, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get Single brand
export const getSIngleBrand = createAsyncThunk(
  "brand/getSIngleBrand",
  async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/brand/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single brand
export const updateSingleBrand = createAsyncThunk(
  "brand/updateSingleBrand",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(`${baseUrl}/brand/${id}`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// delate a single brand
export const delateSingleBrand = createAsyncThunk(
  "brand/delateSingleBrand",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/brand/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single Image
export const updateSingleBrandImage = createAsyncThunk(
  "brand/updateSingleProductImage",
  async ({ id, imageId }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/brand/image/${id}`,
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
