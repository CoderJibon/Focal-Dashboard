import { createSlice } from "@reduxjs/toolkit";
import {
  createBlog,
  delateSingleBlog,
  getAllBlog,
  getSIngleBlog,
  updateBlogImage,
  updateSingleBlog,
} from "./blogApiSlice.js";

// create initialState
const initialState = {
  blog: [],
  singleBlog: null,
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all blog
    builder
      .addCase(getAllBlog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.blog = [];
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.blog = action.payload;
      })
      //create a new Blog
      .addCase(createBlog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleBlog = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleBlog = action.payload.blog;
      })
      //get single color
      .addCase(getSIngleBlog.pending, (state, action) => {
        state.isLoading = true;
        state.singleBlog = null;
      })
      .addCase(getSIngleBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleBlog = null;
      })
      .addCase(getSIngleBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.singleBlog = action.payload.blog;
      })

      //Update a single Blog
      .addCase(updateSingleBlog.pending, (state, action) => {
        state.isLoading = true;
        state.singleBlog = null;
      })
      .addCase(updateSingleBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleBlog = null;
      })
      .addCase(updateSingleBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleBlog = action.payload.blog;
      })
      //Delate a single Blog
      .addCase(delateSingleBlog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(delateSingleBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(delateSingleBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.blog = state.blog.filter(
          (item) => item._id !== action.payload.blog?._id
        );
      }) //Delate a single image
      .addCase(updateBlogImage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateBlogImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(updateBlogImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleBlog.images =
          state.singleBlog.images?.public_id == action.payload.imageId
            ? null
            : state.singleBlog.images;
      });
  },
});

// Actions
export const { setMessageEmpty } = blogSlice.actions;

//selector for blog state
export const getBlog = (state) => state.blog;

//reducer
export default blogSlice.reducer;
