import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [billChargeModal, setBillChargeModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const increaseQuantity = (record) => {
    dispatch({
      type: "updateCart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "updateCart",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <MinusCircleOutlined
            className="mx-3"
            onClick={() => decreaseQuantity(record)}
          />
          <b>{record.quantity}</b>
          <PlusCircleOutlined
            className="mx-3"
            onClick={() => increaseQuantity(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp += item.price * item.quantity;
    });

    setSubTotal(temp);
  }, [cartItems]);

  const onFinish = async (values) => {
    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      totalAmount: Number(subTotal + Number(((subTotal / 100) * 10).toFixed(2))),
      userId: JSON.parse(localStorage.getItem("pos-user"))._id,
    };

    try {
      await axios.post("/api/bills/charge-bill", reqObject);
      message.success("Bill Charged Successfully");
      navigate('/bills');
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <DefaultLayout>
      <h3>Cart</h3>
      <hr />
      <Table columns={columns} dataSource={cartItems} bordered pagination={false} />
      <hr />
      <div className="d-flex flex-column">
        <div className="subtotal d-flex flex-row justify-content-center">
          <h1>
            SUB TOTAL : <b>{subTotal} $/-</b>
          </h1>
        </div>

        <Button className="primary" type="primary" onClick={() => setBillChargeModal(true)}>
          CHARGE BILL
        </Button>
      </div>

      <Modal
        title="Charge Bill"
        open={billChargeModal}
        footer={false}
        onCancel={() => setBillChargeModal(false)}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerPhoneNumber" label="Phone Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Mode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>

          <div className="charge-bill-amount">
            <h5>
              SubTotal : <b>{subTotal}</b>
            </h5>
            <h5>
              Tax : <b>{((subTotal / 100) * 10).toFixed(2)}</b>
            </h5>
            <hr />
            <h2>
              Grand Total : <b>{subTotal + (subTotal / 100) * 10}</b>
            </h2>
          </div>

          <div className="d-flex justify-content-end">
            <Button className="primary" htmlType="submit" type="primary">
              GENERATE BILL
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
}

export default CartPage;
