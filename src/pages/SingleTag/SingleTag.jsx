import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastify from "../../utils/toastify.jsx";
import { RotatingLines } from "react-loader-spinner";
import { setMessageEmpty } from "../../features/Tag/tagSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "antd";
import {
  getSingleTag,
  updateSingleTag,
} from "../../features/Tag/tagApiSlice.js";
import { getSingleCoupon } from "../../features/Coupon/couponApiSlice.js";

const SingleTag = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  //tag
  const { isError, message, singleTag, isLoading } = useSelector(
    (state) => state.tag
  );
  const { id } = useParams();

  // form validation
  let schema = Yup.object().shape({
    name: Yup.string().required("Tag Name is required"),
  });
  // from control
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      setLoad(true);
      dispatch(updateSingleTag({ id, values }));
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
      setLoad(false);
    }
    if (message) {
      toastify("success", message);
      dispatch(setMessageEmpty());
      setLoad(false);
      navigate(`/tag-list`);
      formik.resetForm();
    }
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (singleTag) {
      formik.setValues({
        ...formik.values,
        name: singleTag.name || "",
      });
    }
  }, [singleTag]);

  if (isLoading) {
    return <Skeleton />;
  }

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
        <h3 className="mb-4 title">Add Tag</h3>

        <div className="col-md-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                onChange={formik.handleChange("name")}
                value={formik.values.name}
                type="text"
                label="Enter Tag Name"
                name="name"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>

            <button
              className="btn btn-success border-0 rounded-3 my-3"
              type="submit"
            >
              Add Tag
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingleTag;
