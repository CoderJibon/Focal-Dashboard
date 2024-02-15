import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastify from "../../utils/toastify.jsx";
import { RotatingLines } from "react-loader-spinner";
import { setMessageEmpty } from "../../features/Color/colorSlice.js";
import { createColor } from "../../features/Color/colorApiSlice.js";
import { useNavigate } from "react-router-dom";

const AddColor = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  //brand
  const { isError, message, singleColor } = useSelector((state) => state.color);
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
      dispatch(createColor(values));
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
      navigate(`/list-color/${singleColor?._id}`);
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
        <h3 className="mb-4 title">Add Color</h3>

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
              Add Color
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddColor;
