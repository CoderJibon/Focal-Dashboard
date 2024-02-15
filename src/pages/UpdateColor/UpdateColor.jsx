import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastify from "../../utils/toastify.jsx";
import { RotatingLines } from "react-loader-spinner";
import { setMessageEmpty } from "../../features/Color/colorSlice.js";
import {
  getSingleColor,
  updateSingleColor,
} from "../../features/Color/colorApiSlice.js";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";

const UpdateColor = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  //brand
  const { isError, isLoading, message, singleColor } = useSelector(
    (state) => state.color
  );

  useEffect(() => {
    dispatch(getSingleColor(id));
  }, [dispatch]);
  // form validation
  let schema = Yup.object().shape({
    name: Yup.string().required("Color Name is required"),
    colorCode: Yup.string().required("Color Code is required"),
  });
  // from control
  const formik = useFormik({
    initialValues: {
      name: "",
      colorCode: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setLoad(true);
      dispatch(updateSingleColor({ id, values }));
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
      formik.resetForm();
    }
  }, [isError, message]);

  useEffect(() => {
    if (singleColor) {
      formik.setValues({
        ...formik.values,
        name: singleColor.name || "",
        colorCode: singleColor.colorCode || "",
      });
    }
  }, [singleColor]);

  if (!singleColor) {
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
        <h3 className="mb-4 title">Edit Color</h3>

        <div className="col-md-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                onChange={formik.handleChange("name")}
                value={formik.values.name}
                type="text"
                label="Enter Color Name"
                name="name"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mt-4">
              <CustomInput
                onChange={formik.handleChange("colorCode")}
                value={formik.values.colorCode}
                type="color"
                label="Enter Color Code"
                name="colorCode"
              />

              {formik.errors.colorCode && formik.touched.colorCode ? (
                <div className="error">{formik.errors.colorCode}</div>
              ) : null}
            </div>
            <button
              className="btn btn-success border-0 rounded-3 my-3"
              type="submit"
            >
              Update Color
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateColor;
