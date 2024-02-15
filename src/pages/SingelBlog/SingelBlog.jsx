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
import {
  getSIngleBlog,
  updateBlogImage,
  updateSingleBlog,
} from "../../features/Blog/blogApiSlice.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";
const SingleBlog = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  //blog
  const { isError, message, singleBlog } = useSelector((state) => state.blog);
  //blog Category
  const { blogCategory } = useSelector((state) => state.blogCategory);
  //tag
  const { tag } = useSelector((state) => state.tag);

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

  //get the brand id
  const { slug } = useParams();

  const handleImageDelete = (imageId) => {
    if (imageId) {
      dispatch(updateBlogImage({ id: singleBlog._id, imageId }));
    }
  };
  // blog data loaded successfully
  useEffect(() => {
    dispatch(getSIngleBlog(slug));
  }, [dispatch]);

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
      setLoad(true);
      dispatch(updateSingleBlog({ id: singleBlog._id, formData }));
    },
  });

  //tag show the selected option
  let tagSelected = [];
  tag.map((data, index) => {
    tagSelected.push({ value: data._id, label: data.name });
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
      if (message !== "Image Delete successfully") {
        navigate(`/blog-list`);
      }
    }
  }, [isError, message]);

  useEffect(() => {
    if (singleBlog) {
      formik.setValues({
        ...formik.values,
        title: singleBlog.title || "",
        description: singleBlog.description || "",
        shortDesc: singleBlog.shortDesc || "",
        tag: singleBlog.tag?.map((item) => item._id) || [],
        category: singleBlog.category?._id || null,
      });
    }
  }, [singleBlog]);

  if (!singleBlog) {
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
        <h3 className="mb-4 title">Update Blog</h3>

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
                    //allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Select category"
                    onChange={(value) =>
                      formik.setFieldValue("category", value)
                    }
                    // onChange={formik.handleChange("category")}
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
                  //allowClear
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
                {(singleImage || singleBlog?.images) && (
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
                          : handleImageDelete(singleBlog?.images?.public_id);
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
                          : singleBlog?.images?.url
                      }
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
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
