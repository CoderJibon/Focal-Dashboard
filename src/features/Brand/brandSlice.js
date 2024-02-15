import { createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  delateSingleBrand,
  getAllBrand,
  getSIngleBrand,
  updateSingleBrand,
  updateSingleBrandImage,
} from "./brandApiSlice.js";

// create initialState
const initialState = {
  brand: [],
  singleBrand: null,
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all brand
    builder
      .addCase(getAllBrand.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.brand = [];
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.brand = action.payload;
      })
      //create a new brand
      .addCase(createBrand.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleBrand = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleBrand = action.payload.brand;
      })
      //get single color
      .addCase(getSIngleBrand.pending, (state, action) => {
        state.isLoading = true;
        state.singleBrand = null;
      })
      .addCase(getSIngleBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleBrand = null;
      })
      .addCase(getSIngleBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.singleBrand = action.payload.brand;
      })

      //Update a single brand
      .addCase(updateSingleBrand.pending, (state, action) => {
        state.isLoading = true;
        state.singleBrand = null;
      })
      .addCase(updateSingleBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleBrand = null;
      })
      .addCase(updateSingleBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleBrand = action.payload.brand;
      })
      //Delate a single brand
      .addCase(delateSingleBrand.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(delateSingleBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(delateSingleBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.brand = state.brand.filter(
          (item) => item._id !== action.payload.brand?._id
        );
      }) //Delate a single image
      .addCase(updateSingleBrandImage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateSingleBrandImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(updateSingleBrandImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleBrand.photo =
          state.singleBrand.photo?.public_id == action.payload.imageId
            ? null
            : state.singleBrand.photo;
      });
  },
});

// Actions
export const { setMessageEmpty } = brandSlice.actions;

//selector for brand state
export const getBrand = (state) => state.brand;

//reducer
export default brandSlice.reducer;
