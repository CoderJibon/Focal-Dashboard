import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastify from "../../utils/toastify.jsx";
import { RotatingLines } from "react-loader-spinner";
import { Image, Select } from "antd";
import { setMessageEmpty } from "../../features/ProductCategory/productCategorySlice.js";
import {
  getSInglePDCategory,
  updateProductCategoryImage,
  updateSinglePDCategory,
} from "../../features/ProductCategory/productCategoryApiSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { getAllProduct } from "../../features/Product/productApiSlice.js";
import { Skeleton } from "antd";

const ProductCategorySingle = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  //productCateogry
  const { isError, message, singleCategory } = useSelector(
    (state) => state.productCategory
  );
  //get the brand id
  const { slug } = useParams();
  //product
  const { product } = useSelector((state) => state.product);

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
      description: "",
      products: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Create a new FormData instance
      let formData = new FormData();
      // Append individual form fields
      formData.append("name", values.name);
      formData.append("icon", values.icon);
      formData.append("description", values.description);
      formData.append("photo", values.photo);
      values.products?.forEach((pd) => {
        formData.append("products", pd);
      });
      //setLoad(true);
      dispatch(updateSinglePDCategory({ id: singleCategory._id, formData }));
    },
  });
  //color show the selected option
  let productSelected = [];
  [...product].map((data, index) => {
    productSelected.push({
      value: data._id,
      label: (
        <>
          <div className="chackboxarea">
            <img width={40} src={data.productThumbnails?.url} alt="" />
            {data.title}
          </div>
        </>
      ),
    });
  });
  // update image on formik
  useEffect(() => {
    formik.values.photo = singleImage ? singleImage : null;
  }, [singleImage]);

  const handleImageDelete = (imageId) => {
    if (imageId) {
      dispatch(updateProductCategoryImage({ id: singleCategory._id, imageId }));
    }
  };

  //redux dispatch vai api call
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  // product category data loaded successfully
  useEffect(() => {
    dispatch(getSInglePDCategory(slug));
  }, [dispatch]);

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
      if (message !== "Image Delete successfully") {
        navigate(`/list-category`);
      }
      setLoad(false);
    }
  }, [isError, message]);

  useEffect(() => {
    if (singleCategory) {
      formik.setValues({
        ...formik.values,
        name: singleCategory.name || "",
        description: singleCategory.description || "",
        icon: singleCategory.icon || "",
        products: singleCategory.products || [],
      });
    }
  }, [singleCategory]);

  if (!singleCategory) {
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
        <h3 className="mb-4 title">Category Update</h3>
        <div className="col-md-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-8">
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
                  <ReactQuill
                    theme="snow"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                  />
                </div>
                <div className="mt-4 customSelectededidt">
                  <Select
                    size="large"
                    mode="multiple"
                    //allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Select Products..."
                    name="products"
                    onChange={(value) =>
                      formik.setFieldValue("products", value)
                    }
                    onClear={formik.handleReset}
                    value={formik.values.products}
                    options={productSelected}
                  />
                </div>
              </div>
              <div className="col-md-4">
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
                  {(singleImage || singleCategory?.photo) && (
                    <div
                      className="position-relative mb-3"
                      style={{
                        width: "100%",
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
                            : handleImageDelete(
                                singleCategory?.photo?.public_id
                              );
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
                            : singleCategory?.photo?.url
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
              </div>
            </div>

            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              Update Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductCategorySingle;
