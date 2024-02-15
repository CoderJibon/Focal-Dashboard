import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  delateSingleProduct,
  getAllProduct,
} from "../../features/Product/productApiSlice.js";
import Swal from "sweetalert2";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/Product/productSlice.js";
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
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const { product, isError, message } = useSelector((state) => state.product);
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
        dispatch(delateSingleProduct(id));
      }
    });
  };
  // product data set on table
  let productData = [];
  product?.map((data, index) => {
    productData.push({
      key: index + 1,
      photo: (
        <>
          {data?.productThumbnails && (
            <img
              className="tablePhoto"
              src={data?.productThumbnails?.url}
              alt=""
            />
          )}
        </>
      ),
      title: data?.title,
      price: data?.price,
      brand: data.brand?.name,
      action: (
        <>
          <Link to={`/list-product/${data.slug}`} className=" fs-3 text-danger">
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
    dispatch(getAllProduct());
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
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={productData} />
      </div>
    </div>
  );
};

export default ProductList;
