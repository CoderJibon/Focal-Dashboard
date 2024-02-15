import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  delateSingleCoupon,
  getAllCoupon,
} from "../../features/Coupon/couponApiSlice.js";
import Swal from "sweetalert2";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/Coupon/couponSlice.js";
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
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  const { coupon, isError, message } = useSelector((state) => state.coupon);
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
        dispatch(delateSingleCoupon(id));
      }
    });
  };

  // coupon data set on table
  let couponData = [];
  coupon?.map((data, index) => {
    couponData.push({
      key: index + 1,
      name: data?.name,
      discount: data?.discount,
      expiry: new Date(data?.expiry).toLocaleString(),
      action: (
        <>
          <Link to={`/coupon-list/${data._id}`} className=" fs-3 text-danger">
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
    dispatch(getAllCoupon());
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
      <h3 className="mb-4 title">Coupon List</h3>
      <div>
        <Table columns={columns} dataSource={couponData} />
      </div>
    </div>
  );
};

export default CouponList;
