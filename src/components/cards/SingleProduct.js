import React, { useState } from "react";
import StarRating from "react-star-ratings";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import detafultCardImage from "../../assets/images/default-product-image.jpeg";
import ProductListItems from "./ProductListItems";
import Drift from "drift-zoom";
import { RatingModal } from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";

const { TabPane } = Tabs;

// This is children component of Product.js Page
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const [rating, setRating] = useState();

  // new Drift(document.querySelector("img"));

  return (
    <>
      {/* {JSON.stringify(product)} */}
      <div className="col-md-7 ">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img
                  className="drift-img"
                  src={i.url}
                  // data-zoom={i.url}
                  key={i.public_id}
                  alt={i.slug}
                />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                style={{ height: "450px", objectFit: "cover" }}
                src={detafultCardImage}
                alt={title}
              />
            }
          ></Card>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="More" key="2">
            Fell free to call at +91-xxxx-xxx-xxx for more information regarding
            the product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info text-center p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No Rating Yet</div>
        )}
        <Card
          style={{ minWidth: 450 }}
          actions={[
            <>
              <HeartOutlined className="text-danger" />
              <br /> Add to Wishlist
            </>,
            <>
              <RatingModal>
                <StarRating
                  name={_id} //setting id as name
                  numberOfStars={5}
                  rating={star}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor="red"
                />
              </RatingModal>
            </>,
            <Link to="/">
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </Link>,
          ]}
        >
          {/* <Meta title={title} description={description} /> */}
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};
export default SingleProduct;
