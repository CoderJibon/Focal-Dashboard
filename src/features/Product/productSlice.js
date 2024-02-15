import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  delateSingleProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  updateSingleProductImage,
} from "./productApiSlice.js";

// create initialState
const initialState = {
  product: [],
  singleProduct: null,
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all product
    builder
      .addCase(getAllProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.product = [];
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.product = action.payload.products;
      })
      // create a product
      .addCase(createProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.product.push(action.payload.product);
        state.message = action.payload.message;
      })
      //get single Product
      .addCase(getSingleProduct.pending, (state, action) => {
        state.isLoading = true;
        state.singleProduct = null;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleProduct = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.singleProduct = action.payload.product;
      })
      //Update a single Product
      .addCase(updateSingleProduct.pending, (state, action) => {
        state.isLoading = true;
        state.singleProduct = null;
      })
      .addCase(updateSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleProduct = null;
      })
      .addCase(updateSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleProduct = action.payload.product;
      })
      //Delate a single Product
      .addCase(delateSingleProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(delateSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(delateSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.product = state.product.filter(
          (item) => item._id !== action.payload.product?._id
        );
      }) //Delate a single Product image
      .addCase(updateSingleProductImage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateSingleProductImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(updateSingleProductImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleProduct.productThumbnails =
          state.singleProduct.productThumbnails?.public_id ==
          action.payload.imageId
            ? null
            : state.singleProduct.productThumbnails;
        state.singleProduct.images = state.singleProduct.images?.filter(
          (img) => {
            return img.public_id !== action.payload.imageId;
          }
        );
      });
  },
});

// Actions
export const { setMessageEmpty } = productSlice.actions;

//selector for product state
export const getProduct = (state) => state.product;

//reducer
export default productSlice.reducer;
