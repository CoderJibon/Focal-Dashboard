import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All color
export const getAllColor = createAsyncThunk("color/getAllColor", async () => {
  try {
    const response = await axios.get(`${baseUrl}/color/all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// create a new color
export const createColor = createAsyncThunk(
  "color/createColor",
  async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/color`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// get a single Color
export const getSingleColor = createAsyncThunk(
  "color/getSingleColor",
  async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/color/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single color
export const updateSingleColor = createAsyncThunk(
  "color/updateSingleColor",
  async ({ id, values }) => {
    try {
      const response = await axios.put(`${baseUrl}/color/${id}`, values, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// delate a single Color
export const delateSingleColor = createAsyncThunk(
  "color/delateSingleColor",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/color/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
