import { createSlice } from "@reduxjs/toolkit";
import {
  createTag,
  delateSingleTag,
  getAllTag,
  getSingleTag,
  updateSingleTag,
} from "./tagApiSlice.js";

// create initialState
const initialState = {
  tag: [],
  singleTag: null,
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all enquiries
    builder
      .addCase(getAllTag.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.tag = [];
      })
      .addCase(getAllTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.tag = action.payload;
      })
      //create a new tag
      .addCase(createTag.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleTag = null;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleTag = action.payload.tag;
      })
      //get single tag
      .addCase(getSingleTag.pending, (state, action) => {
        state.isLoading = true;
        state.singleTag = null;
      })
      .addCase(getSingleTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleTag = null;
      })
      .addCase(getSingleTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.singleTag = action.payload;
      })
      //Update a single tag
      .addCase(updateSingleTag.pending, (state, action) => {
        state.isLoading = true;
        state.singleTag = null;
      })
      .addCase(updateSingleTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleTag = null;
      })
      .addCase(updateSingleTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleTag = action.payload.tag;
      })
      //Delate a single tag
      .addCase(delateSingleTag.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(delateSingleTag.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(delateSingleTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.tag = state.tag.filter(
          (item) => item._id !== action.payload.tag?._id
        );
      });
  },
});

// Actions
export const { setMessageEmpty } = tagSlice.actions;

//selector for tag state
export const getTag = (state) => state.tag;

//reducer
export default tagSlice.reducer;
