import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Table} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import  Header  from '../components/Header.js';


const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [allAccounts, setAllAccounts] = useState([]);
  const [editable, setEditable] = useState(null);
  // const [viewData, setViewData] = useState("table");
  // const [selectedDate, setSelectedate] = useState([]);

  //table data
  const columns = [
    {
      title: "Account Name",
      dataIndex: "name",
    },
    {
      title: "Industry",
      dataIndex: "industry",
    },
    {
      title: "Website",
      dataIndex: "website",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Notes",
      dataIndex: "notes ",
    },
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   render: (text) => {moment(text).format("YYYY-MM-DD")},
    // },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //getall transactions

  //useEffect Hook
  useEffect(() => {
    const getAllAccounts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.post("/account/get",{
          userid: user._id,
        });
        setAllAccounts(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue With Accounts");
      }
    };
    getAllAccounts();
  });

  // delete handler
  const handleDelete = async (record) => {
    try {
      await axios.post("/account/delete", {
        AccountId: record._id,
      });
      message.success("Acoount Deleted!");
    } catch (error) { 
      console.log(error);
      message.error("unable to delete");
    }
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (editable) {
        await axios.post("/account/update", {
           payload :{
            ...values,
            userid: user._id
           },
          AccountId: editable._id,
        });
        message.success("Account Updated Successfully");
      } else {
        await axios.post("/account/update", {
          ...values,
          userid: user._id,
        });
        message.success("Account Added Successfully");
      setShowModal(false);
      setEditable(null);
      }
    } catch (error) {
      console.log(error);
      message.error("Faild to add Account");
    }
  };

  return (
    <>
    <Header/>
    <div className="filters">
    {/* <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "accounts" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("accounts")}
          />
        </div> */}
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
        </div>
      <div className="content">
          <Table columns={columns} dataSource={allAccounts} />
      </div>
        <Modal
        title={editable ? 'Edite Transaction' : "Add Account"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Account Name" name="name">
            <Input type="text" />
            </Form.Item>
            <Form.Item label="Industry" name="industry">
            <Input type="text" />
            </Form.Item>
            <Form.Item label="Website" name="website">
            <Input type="text" />
            </Form.Item>
            <Form.Item label="Address" name="address">
            <Input type="text" />
            </Form.Item>
            <Form.Item label="Notes" name="notes">
            <Input type="text" />
            </Form.Item>
          {/* <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item> */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
            </div>
        </Form>
      </Modal>
      </>
  );
};

export default Home;


