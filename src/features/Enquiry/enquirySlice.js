import { createSlice } from "@reduxjs/toolkit";
import {
  createEnquiry,
  delateSingleEnquiry,
  getAllEnquiry,
  getSingleEnquiry,
  updateSingleEnquiry,
  updateStatusEnquiry,
} from "./enquiryApiSlice.js";

// create initialState
const initialState = {
  enquiry: [],
  singleEnquiry: null,
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const enquirySlice = createSlice({
  name: "enquiry",
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
      .addCase(getAllEnquiry.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.enquiry = [];
      })
      .addCase(getAllEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.enquiry = action.payload;
      })
      //create a new Enquiry
      .addCase(createEnquiry.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleEnquiry = null;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleEnquiry = action.payload.enquiry;
      })
      //get single Enquiry
      .addCase(getSingleEnquiry.pending, (state, action) => {
        state.isLoading = true;
        state.singleEnquiry = null;
      })
      .addCase(getSingleEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleEnquiry = null;
      })
      .addCase(getSingleEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.singleEnquiry = action.payload;
      })
      //Update a single Enquiry
      .addCase(updateSingleEnquiry.pending, (state, action) => {
        state.isLoading = true;
        state.singleEnquiry = null;
      })
      .addCase(updateSingleEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.singleEnquiry = null;
      })
      .addCase(updateSingleEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        state.singleEnquiry = action.payload.enquire;
      })
      //Status a single Enquiry
      .addCase(updateStatusEnquiry.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateStatusEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(updateStatusEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;
        const enquiryId = action.payload.enquire?._id;
        const index = state.enquiry.findIndex(
          (enquiry) => enquiry._id === enquiryId
        );
        state.enquiry[index].status = action.payload.enquire?.status;
      })
      //Delate a single Enquiry
      .addCase(delateSingleEnquiry.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(delateSingleEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(delateSingleEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.payload.message;

        state.enquiry = state.enquiry.filter(
          (item) => item._id !== action.payload.enquire?._id
        );
      });
  },
});

// Actions
export const { setMessageEmpty } = enquirySlice.actions;

//selector for enquiry state
export const getEnquiry = (state) => state.enquiry;

//reducer
export default enquirySlice.reducer;
