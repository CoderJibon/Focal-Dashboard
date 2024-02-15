import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl.js";

// admin Login
export const adminLogin = createAsyncThunk("auth/adminLogin", async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/admin`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// stay admin Login
export const loggedInAdmin = createAsyncThunk(
  "auth/loggedInAdmin",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/auth/logged-in-admin`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//forgot password
export const userForgotPassword = createAsyncThunk(
  "auth/userForgotPassword",
  async (data) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/user/forget-password`,
        data,
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

//Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.get(`${baseUrl}/auth/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// forgot password mail send
export const forgotPasswordMail = createAsyncThunk(
  "auth/forgotPasswordMail",
  async (mail) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/user/forget-password`,
        mail,
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

// reset password mail set
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, token }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/user/reset-password/${token}`,
        { password },
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

// get All Orders
export const getAllOrder = createAsyncThunk("order/getAllOrder", async () => {
  try {
    const response = await axios.get(`${baseUrl}/user/get-all-orders`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// delete order
export const DeleteOrder = createAsyncThunk("order/DeleteOrder", async (id) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/user/get-all-orders/order/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//profileUpdate
export const ProfileUpdate = createAsyncThunk(
  "user/ProfileUpdate",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(`${baseUrl}/user/${id}`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
