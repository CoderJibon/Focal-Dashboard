import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

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
    title: "Action",
    dataIndex: "action",
  },
];

const SizeList = () => {
  const dispatch = useDispatch();
  //   const { size } = useSelector((state) => state.size);

  //   // size data set on table
  //   let sizeData = [];
  //   size?.map((data, index) => {
  //     sizeData.push({
  //       key: index + 1,
  //       name: data?.name,
  //       action: (
  //         <>
  //           <Link to="/" className=" fs-3 text-danger">
  //             <BiEdit />
  //           </Link>
  //           <Link className="ms-3 fs-3 text-danger" to="/">
  //             <AiFillDelete />
  //           </Link>
  //         </>
  //       ),
  //     });
  //   });

  //   useEffect(() => {
  //     dispatch(getAllTag());
  //   }, [dispatch]);
  return (
    <div>
      <h3 className="mb-4 title">Product Size list</h3>
      <div>{/* <Table columns={columns} dataSource={tagData} /> */}</div>
    </div>
  );
};

export default SizeList;
