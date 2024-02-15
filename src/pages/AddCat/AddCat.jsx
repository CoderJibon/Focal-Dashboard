import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastify from "../../utils/toastify.jsx";
import { Watch } from "react-loader-spinner";
import { Image } from "antd";
import { setMessageEmpty } from "../../features/ProductCategory/productCategorySlice.js";
import { createCategory } from "../../features/ProductCategory/productCategoryApiSlice.js";
import { useNavigate } from "react-router-dom";

const AddCat = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  //brand
  const { isError, message, singleCategory } = useSelector(
    (state) => state.productCategory
  );
  //file manager multiple image
  const [singleImage, setSingleImage] = useState(null);
  const handleChangeSingleImage = (file) => {
    setSingleImage(file);
  };
  // form validation
  let schema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
  });
  // from control
  const formik = useFormik({
    initialValues: {
      name: "",
      icon: "",
      photo: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Create a new FormData instance
      let formData = new FormData();
      // Append individual form fields
      formData.append("name", values.name);
      formData.append("icon", values.icon);
      formData.append("photo", values.photo);
      setLoad(true);
      dispatch(createCategory(formData));
    },
  });

  // update image on formik
  useEffect(() => {
    formik.values.photo = singleImage ? singleImage : null;
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
      navigate(`/list-category/${singleCategory?.slug}`);
      formik.resetForm();
    }
  }, [isError, message]);
  return (
    <>
      <div className="lodingbar">
        <Watch
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
        <h3 className="mb-4 title">Add Category</h3>
        <div className="col-md-7">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                type="text"
                label="Enter Category Name"
                onChange={formik.handleChange("name")}
                value={formik.values.name}
                name="name"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mt-4">
              <CustomInput
                type="text"
                label="Category Icon"
                onChange={formik.handleChange("icon")}
                value={formik.values.icon}
                name="icon"
              />
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
              Add Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCat;
