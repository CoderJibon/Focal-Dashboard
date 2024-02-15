import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastify from "../../utils/toastify.jsx";
import { RotatingLines } from "react-loader-spinner";
import { setMessageEmpty } from "../../features/BlogCategory/blogCategorySlice.js";
import { useNavigate } from "react-router-dom";
import { createBlogCat } from "../../features/BlogCategory/blogCategoryApiSlice.js";
const AddBlogCat = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  //brand
  const { isError, message, singleBlogCat } = useSelector(
    (state) => state.blogCategory
  );
  // form validation
  let schema = Yup.object().shape({
    name: Yup.string().required("Blog Category Name is required"),
  });
  // from control
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setLoad(true);
      dispatch(createBlogCat(values));
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
      navigate(`/blog-category-list/${singleBlogCat?.slug}`);
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
        <h3 className="mb-4 title">Add Blog Category</h3>

        <div className="">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                type="text"
                label="Enter Blog Category name"
                name="name"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>

            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              Add Blog Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlogCat;
