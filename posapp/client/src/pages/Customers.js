import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table } from "antd";

function Customers() {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();

  const getAllBills = async () => {
    dispatch({ type: "showLoading" });
    try {
      const response = await axios.get("/api/bills/get-all-bills");
      dispatch({ type: "hideLoading" });
      const data = response.data;
      data.reverse();
      setBillsData(data);
    } catch (error) {
      dispatch({ type: "hideLoading" });
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (value) => <span>{value.toString().substring(0, 10)}</span>,
    },
  ];

  useEffect(() => {
    getAllBills();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
      </div>
      <hr />
      <Table columns={columns} dataSource={billsData} bordered />
    </DefaultLayout>
  );
}

export default Customers;