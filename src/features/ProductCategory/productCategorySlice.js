import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  delateSinglePDCategory,
  getAllProductCategory,
  getSInglePDCategory,
  updateProductCategoryImage,
  updateSinglePDCategory,
} from "./productCategoryApiSlice.js";

// create initialState
const initialState = {
  productCategory: [],
  singleCategory: null,
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all productCategory
    builder
      .addCase(getAllProductCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.productCategory = [];
      })
      .addCase(getAllProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.productCategory = action.payload;
      })
      //create a new Category
      .addCase(createCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleCategory = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleCategory = action.payload.productCategory;
      })
      //get single color
      .addCase(getSInglePDCategory.pending, (state, action) => {
        state.isLoading = true;
        state.singleCategory = null;
      })
      .addCase(getSInglePDCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleCategory = null;
      })
      .addCase(getSInglePDCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.singleCategory = action.payload.productCategory;
      })

      //Update a single brand
      .addCase(updateSinglePDCategory.pending, (state, action) => {
        state.isLoading = true;
        state.singleCategory = null;
      })
      .addCase(updateSinglePDCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleCategory = null;
      })
      .addCase(updateSinglePDCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleCategory = action.payload.productCategory;
      })
      //Delate a single brand
      .addCase(delateSinglePDCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(delateSinglePDCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(delateSinglePDCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.productCategory = state.productCategory.filter(
          (item) => item._id !== action.payload.productCategory?._id
        );
      }) //Delate a single image
      .addCase(updateProductCategoryImage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProductCategoryImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(updateProductCategoryImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleCategory.photo =
          state.singleCategory.photo?.public_id == action.payload.imageId
            ? null
            : state.singleCategory.photo;
      });
  },
});

// Actions
export const { setMessageEmpty } = productCategorySlice.actions;

//selector for productCategory state
export const getProductCategory = (state) => state.productCategory;

//reducer
export default productCategorySlice.reducer;
