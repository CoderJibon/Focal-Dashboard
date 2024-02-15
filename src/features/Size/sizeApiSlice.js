import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All size
export const sizeAllSize = createAsyncThunk("size/sizeAllTag", async () => {
  try {
    const response = await axios.get(`${baseUrl}/tag/all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
