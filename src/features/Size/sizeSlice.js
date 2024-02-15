import { createSlice } from "@reduxjs/toolkit";

// create initialState
const initialState = {
  size: [],
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all  size
    builder
      .addCase(sizeAllSize.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sizeAllSize.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.size = [];
      })
      .addCase(sizeAllSize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.size = action.payload;
      });
  },
});

// Actions
export const { setMessageEmpty } = sizeSlice.actions;

//selector for size state
export const getSize = (state) => state.size;

//reducer
export default sizeSlice.reducer;
