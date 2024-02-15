import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All Customers
export const getAllCustomers = createAsyncThunk(
  "customers/getAllCustomers",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Delete Customers
export const DeleteCustomer = createAsyncThunk(
  "customers/DeleteCustomer",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/user/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
