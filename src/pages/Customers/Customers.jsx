import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  DeleteCustomer,
  getAllCustomers,
} from "../../features/Customers/customersApiSlice.js";
import toastify from "../../utils/toastify.jsx";
import Swal from "sweetalert2";
import { Modal } from "antd";
import { setMessageEmpty } from "../../features/Customers/customersSlice.js";
import { Image } from "antd";
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
    title: "Photo",
    dataIndex: "photo",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const { customers, isError, message } = useSelector(
    (state) => state.customers
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const showModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // customer data set on table
  let customerData = [];
  customers?.map((data, index) => {
    customerData.push({
      key: index + 1,
      name: `${data?.firstName?.toUpperCase()} ${data?.lastName?.toUpperCase()}`,
      photo: (
        <>
          <img
            className="tablePhoto"
            src={
              data.photo ? data.photo?.url : `https://i.ibb.co/Lvd1G5h/user.jpg`
            }
            alt=""
          />
        </>
      ),
      email: data.email,
      mobile: data.mobile ? data.mobile : "null",
      action: (
        <>
          <Link
            to="#"
            onClick={() => showModal(data)}
            className=" fs-3 text-danger"
          >
            <AiOutlineEye />
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
        dispatch(DeleteCustomer(id));
      }
    });
  };
  useEffect(() => {
    dispatch(getAllCustomers());
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
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={customerData} />
        <Modal
          title="Customer"
          footer={null}
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <div>
            <div>
              {modalData?.photo ? (
                <>
                  <Image width={"100%"} src={modalData?.photo?.url} />
                </>
              ) : (
                <>
                  <Image
                    width={"100%"}
                    src={`https://i.ibb.co/Lvd1G5h/user.jpg`}
                  />
                </>
              )}
            </div>
            <div>
              <br />
              <p>First Name : {modalData?.firstName?.toUpperCase()}</p>
              <p>Last Name :{modalData?.lastName?.toUpperCase()}</p>
              <p>Email : {modalData?.email} </p>
              <p>Mobile : {modalData?.mobile} </p>
              <p>Gender : {modalData?.gender} </p>
              <p>Role : {modalData?.role} </p>
              <p>Verify : {modalData?.verify ? "verified" : "unverified"} </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Customers;
