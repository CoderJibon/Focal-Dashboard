import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogCat,
  delateSingleBlogCat,
  getAllBlogCategory,
  getSingleBlogCat,
  updateSingleBlogCat,
} from "./blogCategoryApiSlice.js";

// create initialState
const initialState = {
  blogCategory: [],
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const blogCategorySlice = createSlice({
  name: "blogCategory",
  singleBlogCat: null,
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all blog categories
    builder
      .addCase(getAllBlogCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.blogCategory = [];
      })
      .addCase(getAllBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.blogCategory = action.payload;
      })
      //create a new BlogCat
      .addCase(createBlogCat.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleBlogCat = null;
      })
      .addCase(createBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleBlogCat = action.payload.blogCategory;
      })
      //get single BlogCat
      .addCase(getSingleBlogCat.pending, (state, action) => {
        state.isLoading = true;
        state.singleBlogCat = null;
      })
      .addCase(getSingleBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleBlogCat = null;
      })
      .addCase(getSingleBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.singleBlogCat = action.payload.blogCategory;
      })
      //Update a single BlogCat
      .addCase(updateSingleBlogCat.pending, (state, action) => {
        state.isLoading = true;
        state.singleBlogCat = null;
      })
      .addCase(updateSingleBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleBlogCat = null;
      })
      .addCase(updateSingleBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleBlogCat = action.payload.blogCategory;
      })
      //Delate a single BlogCat
      .addCase(delateSingleBlogCat.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(delateSingleBlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(delateSingleBlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        console.log(action.payload);
        state.blogCategory = state.blogCategory.filter(
          (item) => item._id !== action.payload.blogCategory?._id
        );
      });
  },
});

// Actions
export const { setMessageEmpty } = blogCategorySlice.actions;

//selector for blogCategory state
export const getBlogCategory = (state) => state.blogCategory;

//reducer
export default blogCategorySlice.reducer;
