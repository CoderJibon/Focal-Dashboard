import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toastify from "../../utils/toastify.jsx";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { RotatingLines } from "react-loader-spinner";
import { setMessageEmpty } from "../../features/Coupon/couponSlice.js";
import { createCoupon } from "../../features/Coupon/couponApiSlice.js";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  //const getCouponId = location.pathname.split("/")[3];
  const { isError, message, singleCoupon } = useSelector(
    (state) => state.coupon
  );

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
      setLoad(true);
      dispatch(createCoupon(values));
    },
  });

  //message handling
  useEffect(() => {
    if (isError) {
      toastify("error", isError);
      dispatch(setMessageEmpty());
      setLoad(false);
    }
    if (message) {
      toastify("success", message);
      dispatch(setMessageEmpty());
      setLoad(false);
      navigate(`/coupon-list/${singleCoupon?._id}`);
      formik.resetForm();
    }
  }, [isError, message]);
  return (
    <>
      <div className="lodingbar">
        <RotatingLines
          visible={load}
          height="80"
          width="80"
          radius="48"
          color="#FF0000"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      <div>
        <h3 className="mb-4 title">Add Coupon</h3>

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
              Add Coupon
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
