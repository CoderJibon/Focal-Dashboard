import { createSlice } from "@reduxjs/toolkit";
import { DeleteCustomer, getAllCustomers } from "./customersApiSlice.js";

// create initialState
const initialState = {
  customers: [],
  isLoading: false,
  isError: null,
  message: null,
};

// create a new slice
const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setMessageEmpty: (state, action) => {
      state.isError = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // get all customers
    builder
      .addCase(getAllCustomers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.customers = [];
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.customers = action.payload.users;
      })
      //delete customer
      .addCase(DeleteCustomer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(DeleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(DeleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.message = action.message;
        state.customers = state.customers.filter(
          (item) => item._id !== action.payload.user?._id
        );
      });
  },
});

// Actions
export const { setMessageEmpty } = customersSlice.actions;

//selector for customers state
export const getCustomers = (state) => state.customers;

//reducer
export default customersSlice.reducer;
