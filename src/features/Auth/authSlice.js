import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteOrder,
  ProfileUpdate,
  adminLogin,
  forgotPasswordMail,
  getAllOrder,
  loggedInAdmin,
  logout,
  resetPassword,
} from "./authApiSlice.js";

// create initialState

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  order: [],
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //  admin login
      .addCase(adminLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isError = action.error.message;
        state.message = null;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isError = null;
        state.message = action.payload.message;
        state.isLoading = false;
        state.user = action.payload.admin;
        if (action.payload.admin) {
          localStorage.setItem("user", JSON.stringify(action.payload.admin));
        }
      })
      // loggedInAdmin
      .addCase(loggedInAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loggedInAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = action.error.message;
        localStorage.removeItem("user");
      })
      .addCase(loggedInAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.message = null;
        if (action.payload) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      // logout administration
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.message = action.payload.message;
        localStorage.removeItem("user");
      })
      //forgot password mail send
      .addCase(forgotPasswordMail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordMail.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
      })
      .addCase(forgotPasswordMail.fulfilled, (state, action) => {
        state.isError = null;
        state.message = action.payload.message;
        state.isLoading = false;
      })
      //Reset new password
      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isError = null;
        state.message = action.payload.message;
        state.isLoading = false;
      })

      //Order
      .addCase(getAllOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
        state.order = [];
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.isError = null;
        state.isLoading = false;
        state.order = action.payload;
      })
      //Order delete
      .addCase(DeleteOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(DeleteOrder.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
        state.order = [];
      })
      .addCase(DeleteOrder.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isError = null;
        state.isLoading = false;
        state.message = action.message;
        state.order = state.order.filter(
          (or) => or._id !== action.payload.order._id
        );
      }) //  Profile update
      .addCase(ProfileUpdate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ProfileUpdate.rejected, (state, action) => {
        state.isError = action.error.message;
        state.message = null;
        state.isLoading = false;
      })
      .addCase(ProfileUpdate.fulfilled, (state, action) => {
        state.isError = null;
        state.message = action.payload.message;
        state.isLoading = false;
        state.user = action.payload.user;
        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      });
  },
});

// Actions
export const { setMessageEmpty } = authSlice.actions;

//selector for auth state
export const getAuth = (state) => state.auth;

//reducer
export default authSlice.reducer;
