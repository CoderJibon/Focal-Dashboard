import React, { useEffect } from "react";
import { Badge, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  delateSingleColor,
  getAllColor,
} from "../../features/Color/colorApiSlice.js";
import toastify from "../../utils/toastify.jsx";
import Swal from "sweetalert2";
import { setMessageEmpty } from "../../features/Color/colorSlice.js";
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
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const dispatch = useDispatch();
  const { color, isError, message } = useSelector((state) => state.color);

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
        dispatch(delateSingleColor(id));
      }
    });
  };

  // color data set on table
  let colorData = [];
  color?.map((data, index) => {
    colorData.push({
      key: index + 1,
      color: (
        <>
          {data?.colorCode && (
            <Badge text={data?.name} showZero color={`${data?.colorCode}`} />
          )}
        </>
      ),
      name: data?.name,
      action: (
        <>
          <Link to={`/list-color/${data._id}`} className=" fs-3 text-danger">
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
    dispatch(getAllColor());
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
      <h3 className="mb-4 title">Color list</h3>
      <div>
        <Table columns={columns} dataSource={colorData} />
      </div>
    </div>
  );
};

export default ColorList;
