import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastify from "../../utils/toastify.jsx";
import { RotatingLines } from "react-loader-spinner";
import { setMessageEmpty } from "../../features/Brand/brandSlice.js";
import { Image } from "antd";
import { createBrand } from "../../features/Brand/brandApiSlice.js";
import { useNavigate } from "react-router-dom";
const AddBrand = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  //brand
  const { isError, message, singleBrand } = useSelector((state) => state.brand);

  //file manager multiple image
  const [singleImage, setSingleImage] = useState(null);
  const handleChangeSingleImage = (file) => {
    setSingleImage(file);
  };

  // form validation
  let schema = Yup.object().shape({
    name: Yup.string().required("Brand Name is required"),
  });
  // from control
  const formik = useFormik({
    initialValues: {
      name: "",
      brandLogo: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Create a new FormData instance
      let formData = new FormData();
      // Append individual form fields
      formData.append("name", values.name);
      formData.append("photo", values.brandLogo);
      setLoad(true);
      dispatch(createBrand(formData));
    },
  });

  // update image on formik
  useEffect(() => {
    formik.values.brandLogo = singleImage ? singleImage : null;
  }, [singleImage]);

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
      setSingleImage(null);
      setLoad(false);
      navigate(`/list-brand/${singleBrand?._id}`);
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
      <div className="col-md-7">
        <h3 className="mb-4 title">Add Brand</h3>
        <div className="">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                type="text"
                onChange={formik.handleChange("name")}
                value={formik.values.name}
                label="Enter Blog Name"
                name="name"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mt-4">
              {singleImage && (
                <div
                  className="position-relative mb-3"
                  style={{
                    width: "200px",
                    height: "auto",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    className="btn-close position-absolute"
                    onClick={() => setSingleImage(null)}
                    style={{
                      top: "10px",
                      right: "10px",
                      zIndex: 99,
                      boxShadow: "0 0 0 3px white",
                      backgroundColor: "#fff",
                    }}
                  ></button>
                  <Image
                    //visible={true}
                    width={"100%"}
                    height={"auto"}
                    src={URL.createObjectURL(singleImage)}
                    preview={true}
                  />
                </div>
              )}
              <FileUploader
                classes="customizeImage"
                multiple={false}
                handleChange={handleChangeSingleImage}
                name="photo"
              />
            </div>
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              Add Brand
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBrand;
