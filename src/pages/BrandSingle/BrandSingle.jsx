import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import toastify from "../../utils/toastify.jsx";
import { RotatingLines } from "react-loader-spinner";
import { setMessageEmpty } from "../../features/Brand/brandSlice.js";
import { Image } from "antd";
import { useParams } from "react-router-dom";
import {
  getSIngleBrand,
  updateSingleBrand,
  updateSingleBrandImage,
} from "../../features/Brand/brandApiSlice.js";
import { Skeleton } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
const BrandSingle = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  //brand
  const { isError, message, singleBrand } = useSelector((state) => state.brand);

  //get the brand id
  const { id } = useParams();

  //file manager multiple image
  const [singleImage, setSingleImage] = useState(null);

  const handleChangeSingleImage = (file) => {
    setSingleImage(file);
  };

  // brand data loaded successfully
  useEffect(() => {
    dispatch(getSIngleBrand(id));
  }, [dispatch]);

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
      console.log(values);
      // Create a new FormData instance
      let formData = new FormData();
      // Append individual form fields
      formData.append("name", values.name);
      formData.append("photo", values.brandLogo);
      setLoad(true);
      dispatch(updateSingleBrand({ id, formData }));
    },
  });

  // update image on formik
  useEffect(() => {
    formik.values.brandLogo = singleImage ? singleImage : null;
  }, [singleImage]);

  const handleImageDelete = (imageId) => {
    if (imageId) {
      dispatch(updateSingleBrandImage({ id: singleBrand._id, imageId }));
    }
  };

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
    }
  }, [isError, message]);

  useEffect(() => {
    if (singleBrand) {
      formik.setValues({
        ...formik.values,
        name: singleBrand.name || "",
      });
    }
  }, [singleBrand]);

  if (!singleBrand) {
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
      <div className="col-md-7">
        <h3 className="mb-4 title">Edit Brand</h3>
        <div className="">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                type="text"
                onChange={formik.handleChange("name")}
                value={formik.values.name}
                label="Enter Brand Name"
                name="name"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mt-4">
              {(singleImage || singleBrand?.photo) && (
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
                    onClick={() => {
                      singleImage
                        ? setSingleImage(null)
                        : handleImageDelete(singleBrand?.photo?.public_id);
                    }}
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
                    src={
                      singleImage
                        ? URL.createObjectURL(singleImage)
                        : singleBrand?.photo?.url
                    }
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
              Update Brand
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BrandSingle;
