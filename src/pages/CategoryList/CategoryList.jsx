import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  delateSinglePDCategory,
  getAllProductCategory,
} from "../../features/ProductCategory/productCategoryApiSlice.js";
import Swal from "sweetalert2";
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
    title: "Icon",
    dataIndex: "icon",
  },
  {
    title: "Photo",
    dataIndex: "photo",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const dispatch = useDispatch();
  const { productCategory } = useSelector((state) => state.productCategory);

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
        dispatch(delateSinglePDCategory(id));
      }
    });
  };
  // productCategory data set on table
  let productCategoryData = [];
  productCategory?.map((data, index) => {
    productCategoryData.push({
      key: index + 1,
      photo: (
        <>
          {data?.photo && (
            <img className="tablePhoto" src={data?.photo?.url} alt="" />
          )}
        </>
      ),
      icon: data?.icon,
      name: data?.name,
      action: (
        <>
          <Link
            to={`/list-category/${data.slug}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <Link
            onClick={() => handleDelete(data._id)}
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
    dispatch(getAllProductCategory());
  }, [dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Product Category List</h3>
      <div>
        <Table columns={columns} dataSource={productCategoryData} />
      </div>
    </div>
  );
};

export default CategoryList;
