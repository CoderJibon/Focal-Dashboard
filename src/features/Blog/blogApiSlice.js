import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All blog
export const getAllBlog = createAsyncThunk("blog/getAllBlog", async () => {
  try {
    const response = await axios.get(`${baseUrl}/blog/all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Create a blog
export const createBlog = createAsyncThunk("blog/createBlog", async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/blog`, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get Single blog
export const getSIngleBlog = createAsyncThunk(
  "blog/getSIngleBlog",
  async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/blog/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single blog
export const updateSingleBlog = createAsyncThunk(
  "blog/updateSingleBlog",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(`${baseUrl}/blog/${id}`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// delate a single blog
export const delateSingleBlog = createAsyncThunk(
  "blog/delateSingleBlog",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/blog/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single Image
export const updateBlogImage = createAsyncThunk(
  "blog/updateBlogImage",
  async ({ id, imageId }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/blog/image/${id}`,
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
