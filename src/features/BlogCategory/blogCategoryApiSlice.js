import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All BlogCategory
export const getAllBlogCategory = createAsyncThunk(
  "blogCategory/getAllBlogCategory",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/blog-category/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// createBlogCategory
export const createBlogCat = createAsyncThunk(
  "blogCategory/createBlogCat",
  async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/blog-category`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get a single blogCat
export const getSingleBlogCat = createAsyncThunk(
  "blogCat/getSingleBlogCat",
  async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/blog-category/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single blogCat
export const updateSingleBlogCat = createAsyncThunk(
  "blogCat/updateSingleBlogCat",
  async ({ id, values }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/blog-category/${id}`,
        values,
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

// delate a single blogCat
export const delateSingleBlogCat = createAsyncThunk(
  "blogCat/delateSingleBlogCat",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/blog-category/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
