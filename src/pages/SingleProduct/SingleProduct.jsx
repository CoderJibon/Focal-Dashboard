import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { Image, InputNumber, Select } from "antd";
import { FileUploader } from "react-drag-drop-files";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrand } from "../../features/Brand/brandApiSlice.js";
import { getAllColor } from "../../features/Color/colorApiSlice.js";
import { getAllProductCategory } from "../../features/ProductCategory/productCategoryApiSlice.js";
import { getAllTag } from "../../features/Tag/tagApiSlice.js";
import TextArea from "antd/es/input/TextArea.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getSingleProduct,
  updateSingleProduct,
  updateSingleProductImage,
} from "../../features/Product/productApiSlice.js";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/Product/productSlice.js";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";
const SingleProduct = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  //product
  const { isError, message, singleProduct } = useSelector(
    (state) => state.product
  );
  //color
  const { color } = useSelector((state) => state.color);
  //productCategory
  const { productCategory } = useSelector((state) => state.productCategory);
  //brand
  const { brand } = useSelector((state) => state.brand);
  //tag
  const { tag } = useSelector((state) => state.tag);
  const navigate = useNavigate();
  //get the brand id
  const { slug } = useParams();
  //file manager multiple image
  const [singleImage, setSingleImage] = useState(null);
  const handleChangeSingleImage = (file) => {
    setSingleImage(file);
  };
  //gallery
  const [gallery, setGallery] = useState([]);
  const handleChangeGalleryImage = (files) => {
    setGallery((prevState) => [...prevState, ...files]);
  };

  // handle delete image of galery
  const handleDeleteImage = (index) => {
    let newGallery = [...gallery];
    newGallery.splice(index, 1);
    setGallery(newGallery);
  };
  //category show the selected option
  let categorySelected = [];
  productCategory.map((data, index) => {
    categorySelected.push({ value: data._id, label: data.name, key: index });
  });
  //brand show the selected option
  let brandSelected = [];
  brand.map((data, index) => {
    brandSelected.push({ value: data._id, label: data.name, key: index });
  });
  //color show the selected option
  let colorSelected = [];
  color.map((data, index) => {
    colorSelected.push({ value: data._id, label: data.name, key: index });
  });
  //tag show the selected option
  let tagSelected = [];
  tag.map((data, index) => {
    tagSelected.push({ value: data._id, label: data.name, key: index });
  });

  //redux dispatch vai api call
  useEffect(() => {
    dispatch(getAllBrand());
    dispatch(getAllColor());
    dispatch(getAllProductCategory());
    dispatch(getAllTag());
  }, [dispatch]);

  // form validation
  let schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.string().required("Price is required"),
    quantity: Yup.string().required("Quantity is required"),
  });
  // from control
  const formik = useFormik({
    initialValues: {
      title: "",
      longDesc: "",
      shortDesc: "",
      price: "",
      quantity: "",
      color: [],
      size: [],
      collectionName: null,
      tag: [],
      brand: null,
      category: [],
      productThumbnails: "",
      images: [],
      isImage: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Create a new FormData instance
      let formData = new FormData();
      // Append individual form fields
      formData.append("title", values.title);
      formData.append("longDesc", values.longDesc);
      formData.append("shortDesc", values.shortDesc);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      values.color?.forEach((color) => {
        formData.append("color", color);
      });
      //formData.append("size", values.size);
      formData.append(
        "collectionName",
        values.collectionName ? values.collectionName : ""
      );
      values.tag?.forEach((tag) => {
        formData.append("tag", tag);
      });

      formData.append("brand", values.brand ? values.brand : "");
      values.category?.forEach((category) => {
        formData.append("category", category);
      });
      formData.append("productThumbnails", values.productThumbnails);
      values.images?.forEach((image) => {
        formData.append("images", image);
      });
      setLoad(true);
      dispatch(updateSingleProduct({ id: singleProduct?._id, formData }));
    },
  });

  // update image on formik
  useEffect(() => {
    formik.values.images = gallery ? gallery : [];
    formik.values.productThumbnails = singleImage ? singleImage : null;
  }, [singleImage, gallery]);

  // blog data loaded successfully
  useEffect(() => {
    dispatch(getSingleProduct(slug));
  }, [dispatch]);

  //product image deleted
  const productImageDelete = (imageId) => {
    if (imageId) {
      dispatch(updateSingleProductImage({ id: singleProduct._id, imageId }));
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
      setGallery([]);
      setLoad(false);
      if (message !== "Image Delete successfully") {
        navigate(`/list-product`);
      }
      formik.resetForm();
    }
  }, [isError, message]);
  useEffect(() => {
    if (singleProduct) {
      formik.setValues({
        ...formik.values,
        title: singleProduct.title || "",
        longDesc: singleProduct.longDesc || "",
        shortDesc: singleProduct.shortDesc || "",
        price: singleProduct.price || "",
        quantity: singleProduct.quantity || "",
        color: singleProduct.color?.map((item) => item._id) || [],
        //size: singleProduct.tag?.map((item) => item._id) || [],
        collectionName: singleProduct.collectionName || null,
        tag: singleProduct.tag?.map((item) => item._id) || [],
        brand: singleProduct.brand?._id || null,
        category: singleProduct.category?.map((item) => item._id) || [],
      });
    }
  }, [singleProduct]);

  if (!singleProduct) {
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
        <div className="row">
          <div className="col-md-12">
            <h3 className="mb-4 title">Update Product</h3>
          </div>
        </div>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-9">
                <CustomInput
                  type="text"
                  label="Enter Product Title"
                  name="title"
                  onChange={formik.handleChange("title")}
                  value={formik.values.title}
                />
                {formik.errors.title && formik.touched.title ? (
                  <div className="error">{formik.errors.title}</div>
                ) : null}
              </div>
              <div className="col-md-3">
                <div>
                  <Select
                    className="mt-3"
                    size="large"
                    allowClear
                    name="brand"
                    onChange={formik.handleChange("brand")}
                    onClear={formik.handleReset}
                    value={formik.values.brand}
                    style={{
                      width: "100%",
                    }}
                    placeholder="Select Brand"
                    options={brandSelected}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-9 mt-3">
                <ReactQuill
                  theme="snow"
                  name="longDesc"
                  value={formik.values.longDesc}
                  onChange={formik.handleChange("longDesc")}
                />

                <div className="row">
                  <div className="col-md-6 mt-4">
                    <InputNumber
                      style={{ width: "100%" }}
                      size="large"
                      addonBefore="Price"
                      addonAfter="$"
                      name="price"
                      onChange={(value) => formik.setFieldValue("price", value)}
                      value={formik.values.price}
                      width={"100%"}
                      min={0}
                    />
                    {formik.errors.price && formik.touched.price ? (
                      <div className="error">{formik.errors.price}</div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mt-4">
                    <InputNumber
                      style={{ width: "100%" }}
                      size="large"
                      addonBefore="Quantity"
                      name="quantity"
                      onChange={(value) =>
                        formik.setFieldValue("quantity", value)
                      }
                      value={formik.values.quantity}
                      width={"100%"}
                      min={0}
                    />
                    {formik.errors.quantity && formik.touched.quantity ? (
                      <div className="error">{formik.errors.quantity}</div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mt-4">
                    <Select
                      size="large"
                      mode="multiple"
                      //allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Select Color"
                      name="color"
                      onChange={(value) => formik.setFieldValue("color", value)}
                      onClear={formik.handleReset}
                      value={formik.values.color}
                      options={colorSelected}
                    />
                  </div>
                  <div className="col-md-6 mt-4">
                    <Select
                      size="large"
                      mode="multiple"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Select Size"
                      //onChange={(value) => formik.setFieldValue("size", value)}
                      //onClear={formik.handleReset}
                      //value={formik.values.size}
                    />
                  </div>
                  <div className="col-md-12 mt-4">
                    {(gallery.length >= 0 || singleProduct.images >= 0) && (
                      <div className="mb-4 productGallery">
                        {[...singleProduct.images]?.map((img, index) => (
                          <div
                            key={index}
                            className="position-relative"
                            style={{ width: 150, height: 150 }}
                          >
                            <button
                              type="button"
                              onClick={() => productImageDelete(img.public_id)}
                              className="btn-close position-absolute"
                              style={{
                                top: "10px",
                                right: "10px",
                                zIndex: 99,
                                boxShadow: "0 0 0 3px white",
                                backgroundColor: "#fff",
                              }}
                            ></button>
                            <Image
                              style={{
                                width: 150,
                                height: 150,
                                objectFit: "cover",
                              }}
                              src={img.url}
                              preview={true}
                            />
                          </div>
                        ))}
                        {[...gallery]?.map((img, index) => (
                          <div
                            key={index}
                            className="position-relative"
                            style={{ width: 150, height: 150 }}
                          >
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(index)}
                              className="btn-close position-absolute"
                              style={{
                                top: "10px",
                                right: "10px",
                                zIndex: 99,
                                boxShadow: "0 0 0 3px white",
                                backgroundColor: "#fff",
                              }}
                            ></button>
                            <Image
                              style={{
                                width: 150,
                                height: 150,
                                objectFit: "cover",
                              }}
                              src={URL.createObjectURL(img)}
                              preview={true}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <FileUploader
                      classes="customizeImage mt-0"
                      multiple={true}
                      handleChange={handleChangeGalleryImage}
                      name="images"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <Select
                  className="mt-2"
                  size="large"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  onClear={formik.handleReset}
                  placeholder="Select Collection"
                  name="collectionName"
                  onChange={formik.handleChange("collectionName")}
                  value={formik.values.collectionName}
                  options={[
                    {
                      value: "featured",
                      label: "Featured",
                    },
                    {
                      value: "popular",
                      label: "Popular",
                    },
                    {
                      value: "special",
                      label: "Special",
                    },
                  ]}
                />

                <Select
                  className="mt-4"
                  size="large"
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  name="category"
                  placeholder="Select Category"
                  onChange={(value) => formik.setFieldValue("category", value)}
                  onClear={formik.handleReset}
                  value={formik.values.category}
                  options={categorySelected}
                />

                <Select
                  className="mt-4 mb-4"
                  size="large"
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  name="tag"
                  placeholder="Select Tags"
                  onChange={(value) => formik.setFieldValue("tag", value)}
                  onClear={formik.handleReset}
                  value={formik.values.tag}
                  options={tagSelected}
                />
                {(singleImage || singleProduct?.productThumbnails) && (
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
                      onClick={() =>
                        singleImage
                          ? setSingleImage(null)
                          : productImageDelete(
                              singleProduct?.productThumbnails?.public_id
                            )
                      }
                      style={{
                        top: "10px",
                        right: "10px",
                        zIndex: 99,
                        boxShadow: "0 0 0 3px white",
                        backgroundColor: "#fff",
                      }}
                    ></button>
                    {singleImage ? (
                      <Image
                        //visible={true}
                        width={"100%"}
                        height={"auto"}
                        src={URL.createObjectURL(singleImage)}
                        preview={true}
                      />
                    ) : (
                      singleProduct && (
                        <img
                          visible={true} // This is commented out, but you can uncomment if needed
                          width={"100%"}
                          height={"auto"}
                          src={singleProduct?.productThumbnails?.url}
                          alt="Product Thumbnail"
                          preview={true} // Not sure what this is for, so it's commented out
                        />
                      )
                    )}
                  </div>
                )}
                <FileUploader
                  classes="customizeImage"
                  multiple={false}
                  handleChange={handleChangeSingleImage}
                  name="productThumbnails"
                />
                {formik.errors.productThumbnails &&
                formik.touched.productThumbnails ? (
                  <div className="error">{formik.errors.productThumbnails}</div>
                ) : null}
              </div>
              <div className="col-md-9 mt-3">
                <TextArea
                  showCount
                  maxLength={300}
                  name="shortDesc"
                  onChange={formik.handleChange("shortDesc")}
                  value={formik.values.shortDesc}
                  placeholder="Sort Description"
                  style={{
                    height: 100,
                    resize: "none",
                  }}
                />
              </div>
            </div>

            <button
              className="btn btn-success border-0 rounded-3 mt-4"
              type="submit"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
