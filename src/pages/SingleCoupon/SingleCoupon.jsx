import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toastify from "../../utils/toastify.jsx";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { setMessageEmpty } from "../../features/Coupon/couponSlice.js";
import {
  getSingleCoupon,
  updateSingleCoupon,
} from "../../features/Coupon/couponApiSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "antd";

const SingleCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const getCouponId = location.pathname.split("/")[3];
  const { isError, message, singleCoupon, isLoading } = useSelector(
    (state) => state.coupon
  );
  const { id } = useParams();
  let schema = yup.object().shape({
    name: yup.string().required("Coupon Name is Required"),
    expiry: yup.date().required("Expiry Date is Required"),
    discount: yup.number().required("Discount Percentage is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateSingleCoupon({ id, values }));
    },
  });

  //get single tag
  useEffect(() => {
    dispatch(getSingleCoupon(id));
  }, [dispatch, id]);

  //message handling
  useEffect(() => {
    if (isError) {
      toastify("error", isError);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toastify("success", message);
      dispatch(setMessageEmpty());
      navigate(`/coupon-list`);
      formik.resetForm();
    }
  }, [isError, message]);

  useEffect(() => {
    if (singleCoupon) {
      const formattedExpireDate = singleCoupon.expiry
        ? new Date(singleCoupon.expiry).toISOString().split("T")[0]
        : "";
      console.log(formattedExpireDate);
      formik.setValues({
        ...formik.values,
        name: singleCoupon.name || "",
        expiry: formattedExpireDate,
        discount: singleCoupon.discount || "",
      });
    }
  }, [singleCoupon]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="lodingbar"></div>
      <div>
        <h3 className="mb-4 title">Update Coupon</h3>

        <div className=" w-25">
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              name="name"
              onChange={formik.handleChange("name")}
              value={formik.values.name}
              label="Enter Coupon Name"
              id="name"
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
            <CustomInput
              type="date"
              name="expiry"
              onChange={formik.handleChange("expiry")}
              value={formik.values.expiry}
              label="Enter Expiry Data"
              id="date"
            />
            {formik.errors.expiry && formik.touched.expiry ? (
              <div className="error">{formik.errors.expiry}</div>
            ) : null}
            <CustomInput
              type="number"
              name="discount"
              onChange={formik.handleChange("discount")}
              value={formik.values.discount}
              label="Enter Discount"
              id="discount"
            />
            {formik.errors.discount && formik.touched.discount ? (
              <div className="error">{formik.errors.discount}</div>
            ) : null}
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              Update Coupon
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingleCoupon;
