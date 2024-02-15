import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  delateSingleEnquiry,
  getAllEnquiry,
  updateStatusEnquiry,
} from "../../features/Enquiry/enquiryApiSlice.js";
import { setMessageEmpty } from "../../features/Enquiry/enquirySlice.js";
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
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
import { Modal } from "antd";
const Enquiries = () => {
  const dispatch = useDispatch();
  const { enquiry, isError, message } = useSelector((state) => state.enquiry);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // enquiry data set on table
  let enquiryData = [];
  enquiry?.map((data, index) => {
    enquiryData.push({
      key: index + 1,
      name: data?.name?.toUpperCase(),
      email: data.email,
      mobile: data.mobile ? data.mobile : "null",
      status: (
        <>
          <select
            name=""
            defaultValue={data.status ? data.status : "Submitted"}
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, data._id)}
          >
            <option
              selected={data?.status == "Submitted" ? true : false}
              value="Submitted"
            >
              Submitted
            </option>
            <option
              selected={data?.status == "Contacted" ? true : false}
              value="Contacted"
            >
              Contacted
            </option>
            <option
              selected={data?.status == "In Progress" ? true : false}
              value="In Progress"
            >
              In Progress
            </option>
            <option
              selected={data?.status == "Resolved" ? true : false}
              value="Resolved"
            >
              Resolved
            </option>
          </select>
        </>
      ),
      action: (
        <>
          <Link to="#" onClick={showModal} className=" fs-3 text-danger">
            <AiOutlineEye />
          </Link>
          <Modal
            title="Enquire"
            footer={null}
            open={isModalOpen}
            onCancel={handleCancel}
          >
            <p>name : {data.name} </p>
            <p>email : {data.email} </p>
            <p>mobile : {data.mobile} </p>
            <p>status : {data.status}</p>
            <p>comment : {data.comment} </p>
          </Modal>
          <Link
            className="ms-3 fs-3 text-danger"
            onClick={() => handleTagDelete(data._id)}
            to="#"
          >
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  });

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
        dispatch(delateSingleEnquiry(id));
      }
    });
  };

  //setEnquiryStatus
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, status: e };
    dispatch(updateStatusEnquiry(data));
  };

  useEffect(() => {
    dispatch(getAllEnquiry());
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
      <h3 className="mb-4 title">Enquiries list</h3>
      <div>
        <Table columns={columns} dataSource={enquiryData} />
      </div>
    </div>
  );
};

export default Enquiries;
