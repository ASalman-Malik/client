import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

export const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  let history = useHistory();
  let { slug } = useParams();
  //   console.log('Params from rating',  slug)

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      // history.push("/login");// redirect to login page from anypage if your want to give rating
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` }, //react-router-dom state
      });
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br /> {user ? "Leave Rating" : "Login to leave rating"}
      </div>
      <Modal
        centered
        title="Leave your rating"
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanyou for you valuable rating");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};
