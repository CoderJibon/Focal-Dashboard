import { createSlice } from "@reduxjs/toolkit";
import {
  createColor,
  delateSingleColor,
  getAllColor,
  getSingleColor,
  updateSingleColor,
} from "./colorApiSlice.js";

// create initialState
const initialState = {
  color: [],
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const colorSlice = createSlice({
  name: "color",
  initialState,
  singleColor: null,
  isLoading: false,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all color
    builder
      .addCase(getAllColor.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.color = [];
      })
      .addCase(getAllColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.color = action.payload;
      })
      //create a new color
      .addCase(createColor.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleColor = null;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleColor = action.payload.color;
      })
      //get single color
      .addCase(getSingleColor.pending, (state, action) => {
        state.isLoading = true;
        state.singleColor = null;
      })
      .addCase(getSingleColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleColor = null;
      })
      .addCase(getSingleColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.singleColor = action.payload.color;
      })
      //Update a single color
      .addCase(updateSingleColor.pending, (state, action) => {
        state.isLoading = true;
        state.singleColor = null;
      })
      .addCase(updateSingleColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleColor = null;
      })
      .addCase(updateSingleColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleColor = action.payload.color;
      })
      //Delate a single color
      .addCase(delateSingleColor.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(delateSingleColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(delateSingleColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.color = state.color.filter(
          (item) => item._id !== action.payload.color?._id
        );
      });
  },
});

// Actions
export const { setMessageEmpty } = colorSlice.actions;

//selector for color state
export const getColor = (state) => state.color;

//reducer
export default colorSlice.reducer;
