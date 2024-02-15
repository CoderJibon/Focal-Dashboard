import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { Image, Select } from "antd";
import { FileUploader } from "react-drag-drop-files";
import ReactQuill from "react-quill";
import TextArea from "antd/es/input/TextArea.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastify from "../../utils/toastify.jsx";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { getAllBlogCategory } from "../../features/BlogCategory/blogCategoryApiSlice.js";
import { setMessageEmpty } from "../../features/Blog/blogSlice.js";
import { getAllTag } from "../../features/Tag/tagApiSlice.js";
import { createBlog } from "../../features/Blog/blogApiSlice.js";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  //blog
  const { isError, message, singleBlog } = useSelector((state) => state.blog);
  //blog Category
  const { blogCategory } = useSelector((state) => state.blogCategory);
  //tag
  const { tag } = useSelector((state) => state.tag);
  //tag show the selected option
  let tagSelected = [];
  tag.map((data, index) => {
    tagSelected.push({ value: data._id, label: data.name });
  });
  //file manager multiple image
  const [singleImage, setSingleImage] = useState(null);
  const handleChangeSingleImage = (file) => {
    setSingleImage(file);
  };
  //category show the selected option
  let categorySelected = [];
  blogCategory.map((data, index) => {
    categorySelected.push({ value: data._id, label: data.name });
  });

  //redux dispatch vai api call
  useEffect(() => {
    dispatch(getAllBlogCategory());
    dispatch(getAllTag());
  }, [dispatch]);

  // form validation
  let schema = Yup.object().shape({
    title: Yup.string().required("Blog Title is required"),
  });

  // from control
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      shortDesc: "",
      category: null,
      images: null,
      tag: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Create a new FormData instance
      let formData = new FormData();
      // Append individual form fields
      formData.append("title", values.title);
      formData.append("description", values.description);
      values.tag?.forEach((tag) => {
        formData.append("tag", tag);
      });
      formData.append("category", values.category ? values.category : "");
      formData.append("images", values.images);
      formData.append("shortDesc", values.shortDesc);
      if (user) {
        formData.append("author", user._id);
      }
      setLoad(true);
      dispatch(createBlog(formData));
    },
  });
  // update image on formik
  useEffect(() => {
    formik.values.images = singleImage ? singleImage : null;
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
      navigate(`/blog-list/${singleBlog?.slug}`);
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
        <h3 className="mb-4 title">Add Blog</h3>

        <div className="">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-9">
                <CustomInput
                  type="text"
                  label="Enter Blog Title"
                  name="title"
                  onChange={formik.handleChange("title")}
                  value={formik.values.title}
                />
                {formik.errors.title && formik.touched.title ? (
                  <div className="error">{formik.errors.title}</div>
                ) : null}
              </div>
              <div className="col-md-3">
                <div className="mt-3">
                  <Select
                    size="large"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Select category"
                    onChange={formik.handleChange("category")}
                    onClear={formik.handleReset}
                    value={formik.values.category}
                    options={categorySelected}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-9 mt-3">
                <ReactQuill
                  theme="snow"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                />
                <TextArea
                  className="mt-4"
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
              <div className="col-md-3">
                <Select
                  className="mt-2 mb-4"
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
                {singleImage && (
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
                  name="images"
                />
                {formik.errors.images && formik.touched.images ? (
                  <div className="error">{formik.errors.images}</div>
                ) : null}
              </div>
            </div>

            <button
              className="btn btn-success border-0 rounded-3 mt-4"
              type="submit"
            >
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
