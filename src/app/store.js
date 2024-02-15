import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/AuthSlice.js";
import customersReducer from "../features/Customers/customersSlice.js";
import enquiryReducer from "../features/Enquiry/enquirySlice.js";
import blogReducer from "../features/Blog/blogSlice.js";
import blogCategoryReducer from "../features/BlogCategory/blogCategorySlice.js";
import couponReducer from "../features/Coupon/couponSlice.js";
import colorReducer from "../features/Color/colorSlice.js";
import productCategoryReducer from "../features/ProductCategory/productCategorySlice.js";
import brandReducer from "../features/Brand/brandSlice.js";
import productReducer from "../features/Product/productSlice.js";
import tagReducer from "../features/Tag/tagSlice.js";

// configure store
const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    enquiry: enquiryReducer,
    blog: blogReducer,
    blogCategory: blogCategoryReducer,
    coupon: couponReducer,
    color: colorReducer,
    productCategory: productCategoryReducer,
    brand: brandReducer,
    product: productReducer,
    tag: tagReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

// export store
export default store;
