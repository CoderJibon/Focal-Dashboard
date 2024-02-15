import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// get All Customers
export const getAllEnquiry = createAsyncThunk(
  "enquiry/getAllEnquiry",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/enquire/all`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create Enquiry
export const createEnquiry = createAsyncThunk(
  "Enquiry/createEnquiry",
  async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/enquire`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get a single Enquiry
export const getSingleEnquiry = createAsyncThunk(
  "Enquiry/getSingleEnquiry",
  async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/enquire/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a single Enquiry
export const updateSingleEnquiry = createAsyncThunk(
  "Enquiry/updateSingleEnquiry",
  async ({ id, enqData }) => {
    try {
      const response = await axios.put(`${baseUrl}/enquire/${id}`, enqData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// delate a single Enquiry
export const delateSingleEnquiry = createAsyncThunk(
  "Enquiry/delateSingleEnquiry",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/enquire/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update a Status Enquiry
export const updateStatusEnquiry = createAsyncThunk(
  "Enquiry/updateStatusEnquiry",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/enquire/status/${id}`,
        { status: status },
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
