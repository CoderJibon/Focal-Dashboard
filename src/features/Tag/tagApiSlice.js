import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All tag
export const getAllTag = createAsyncThunk("tag/getAllTag", async () => {
  try {
    const response = await axios.get(`${baseUrl}/tag/all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// create tag
export const createTag = createAsyncThunk("tag/createTag", async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/tag`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get a single tag
export const getSingleTag = createAsyncThunk("tag/getSingleTag", async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/tag/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Update a single tag
export const updateSingleTag = createAsyncThunk(
  "tag/updateSingleTag",
  async ({ id, values }) => {
    try {
      const response = await axios.put(`${baseUrl}/tag/${id}`, values, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// delate a single tag
export const delateSingleTag = createAsyncThunk(
  "tag/delateSingleTag",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/tag/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
