import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All Coupon
export const getAllCoupon = createAsyncThunk(
  "coupon/getAllCoupon",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/coupon/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create a new Coupon
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/coupon`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// get a single Coupon
export const getSingleCoupon = createAsyncThunk(
  "coupon/getSingleCoupon",
  async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/coupon/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single Coupon
export const updateSingleCoupon = createAsyncThunk(
  "coupon/updateSingleCoupon",
  async ({ id, values }) => {
    try {
      const response = await axios.put(`${baseUrl}/coupon/${id}`, values, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// delate a single Coupon
export const delateSingleCoupon = createAsyncThunk(
  "coupon/delateSingleCoupon",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/coupon/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
