import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  delateSingleBlog,
  getAllBlog,
} from "../../features/Blog/blogApiSlice.js";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/Blog/blogSlice.js";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Photo",
    dataIndex: "photo",
  },
  {
    title: "Title",
    dataIndex: "name",
  },

  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  const { blog, isError, message } = useSelector((state) => state.blog);
  const handleDelete = (id) => {
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
        dispatch(delateSingleBlog(id));
      }
    });
  };

  // blog data set on table
  let blogData = [];
  blog?.map((data, index) => {
    blogData.push({
      key: index + 1,
      name: data?.title,
      photo: (
        <>
          {data.images?.url && (
            <img className="tablePhoto" src={data?.images?.url} alt="" />
          )}
        </>
      ),
      category: data.category ? data.category?.name : "null",
      action: (
        <>
          <Link to={`/blog-list/${data.slug}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link
            className="ms-3 fs-3 text-danger"
            onClick={() => handleDelete(data._id)}
            to="#"
          >
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  });

  useEffect(() => {
    dispatch(getAllBlog());
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
      <h3 className="mb-4 title">Blog list</h3>
      <div>
        <Table columns={columns} dataSource={blogData} />
      </div>
    </div>
  );
};

export default BlogList;
