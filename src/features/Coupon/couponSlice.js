import { createSlice } from "@reduxjs/toolkit";
import {
  createCoupon,
  delateSingleCoupon,
  getAllCoupon,
  getSingleCoupon,
  updateSingleCoupon,
} from "./couponApiSlice.js";

// create initialState
const initialState = {
  coupon: [],
  isLoading: false,
  singleCoupon: null,
  isError: null,
  message: null,
};

// create a new slice
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  singleCoupon: null,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all coupon
    builder
      .addCase(getAllCoupon.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.coupon = [];
      })
      .addCase(getAllCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.coupon = action.payload;
      }) //create a new Coupon
      .addCase(createCoupon.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleCoupon = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleCoupon = action.payload.coupon;
      })
      //get single Coupon
      .addCase(getSingleCoupon.pending, (state, action) => {
        state.isLoading = true;
        state.singleCoupon = null;
      })
      .addCase(getSingleCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleCoupon = null;
      })
      .addCase(getSingleCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.singleCoupon = action.payload.coupon;
      })
      //Update a single Coupon
      .addCase(updateSingleCoupon.pending, (state, action) => {
        state.isLoading = true;
        state.singleCoupon = null;
      })
      .addCase(updateSingleCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleCoupon = null;
      })
      .addCase(updateSingleCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleCoupon = action.payload.coupon;
      })
      //Delate a single Coupon
      .addCase(delateSingleCoupon.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(delateSingleCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(delateSingleCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.coupon = state.coupon.filter(
          (item) => item._id !== action.payload.coupon?._id
        );
      });
  },
});

// Actions
export const { setMessageEmpty } = couponSlice.actions;

//selector for coupon state
export const getCoupon = (state) => state.coupon;

//reducer
export default couponSlice.reducer;
