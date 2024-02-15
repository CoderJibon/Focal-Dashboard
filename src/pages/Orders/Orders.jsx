import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DeleteOrder, getAllOrder } from "../../features/Auth/authApiSlice.js";
import { setMessageEmpty } from "../../features/Auth/authSlice.js";
import toastify from "../../utils/toastify.jsx";
import Swal from "sweetalert2";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Total",
    dataIndex: "amount",
  },
  {
    title: "Items",
    dataIndex: "items",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const { order, isError, message } = useSelector((state) => state.auth);

  // Customer Order data set on the table
  let orderData = [];
  order?.map((pd, index) => {
    orderData.push({
      key: index + 1,
      name:
        pd?.orderby?.firstName?.toUpperCase() +
        " " +
        pd?.orderby?.lastName?.toUpperCase(),
      amount: pd?.paymentIntent?.amount,
      date: new Date(pd?.createdAt).toLocaleString(),
      items: "",
      status: "",
      action: (
        <>
          <Link to={`#`} className=" fs-3 text-danger">
            <AiOutlineEye />
          </Link>
          <Link
            className="ms-3 fs-3 text-danger"
            onClick={() => handleDelete(pd._id)}
            to="#"
          >
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  });
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
        dispatch(DeleteOrder(id));
      }
    });
  };
  useEffect(() => {
    dispatch(getAllOrder());
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
      <h3 className="mb-4 title">Orders list</h3>
      <div>
        <Table columns={columns} dataSource={orderData} />
      </div>
    </div>
  );
};

export default Orders;
