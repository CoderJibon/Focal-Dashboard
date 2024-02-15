import { createSlice } from "@reduxjs/toolkit";

// create initialState
const initialState = {
  upload: [],
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {},
});

// Actions
export const { setMessageEmpty } = uploadSlice.actions;

//selector for upload state
export const getUpload = (state) => state.upload;

//reducer
export default uploadSlice.reducer;
