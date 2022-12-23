import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import detafultCardImage from "../../assets/images/default-product-image.jpeg";
import { showAverage } from "../../functions/rating";

// destructuring Meta from Card
const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
  // destructuring required product fileds from product props
  const { title, description, images, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No Rating Yet</div>
      )}
      <Card
        hoverable
        style={{ marginTop: 20 }}
        cover={
          <img
            style={{ height: "150px", objectFit: "cover" }}
            src={images && images.length ? images[0].url : detafultCardImage}
            alt={title}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-primary" />
            <p>View Product</p>
          </Link>,
          <>
            <ShoppingCartOutlined className="text-success" />
            <p>Add to Cart</p>
          </>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 30)}...`}
          price={price}
        />
      </Card>
    </>
  );
};

export default ProductCard;
