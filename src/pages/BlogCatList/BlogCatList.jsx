import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  delateSingleBlogCat,
  getAllBlogCategory,
} from "../../features/BlogCategory/blogCategoryApiSlice.js";
import Swal from "sweetalert2";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/BlogCategory/blogCategorySlice.js";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogCatList = () => {
  const dispatch = useDispatch();
  const { blogCategory, isError, message } = useSelector(
    (state) => state.blogCategory
  );

  const handleTagDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delateSingleBlogCat(id));
      }
    });
  };
  // blogCategory data set on table
  let blogCategoryData = [];
  blogCategory?.map((data, index) => {
    blogCategoryData.push({
      key: index + 1,
      name: data?.name,
      action: (
        <>
          <Link
            to={`/blog-category-list/${data.slug}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <Link
            onClick={() => handleTagDelete(data._id)}
            className="ms-3 fs-3 text-danger"
            to="#"
          >
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  });

  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, [dispatch]);
  //message handling
  useEffect(() => {
    if (isError) {
      toastify("error", isError);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toastify("success", message);
      dispatch(setMessageEmpty());
    }
  }, [isError, message, dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={blogCategoryData} />
      </div>
    </div>
  );
};

export default BlogCatList;
