import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import detafultCardImage from "../../assets/images/default-product-image.jpeg";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructuring required products from product
  const { title, description, images, slug } = product;

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          className=""
          style={{ height: "150px", objectFit: "cover" }}
          src={images && images.length ? images[0].url : detafultCardImage}
          alt={title}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          {" "}
          <EditOutlined className="text-success" key="edit" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          key="delete"
          onClick={() => handleRemove(slug, title)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 30)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
