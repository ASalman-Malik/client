import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount,removeProduct } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";

const AllProducts = () => {
  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(50)
      .then((res) => {
        // console.log("Products fetched by count", res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error while fetching products by count", err);
      });
  };

  const handleRemove = async (slug, title) => {
    if (window.confirm(`Are you sure? You want to Delete ${title} ?`)) {
      setLoading(true);
      removeProduct(slug, user.token)
        .then((res) => {
          setLoading(false);
          loadAllProducts();
          toast.error(`${res.data.title} is Deleted.`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <div className="col text-center pt-5">
              <LoadingOutlined className="text-danger h1" />
            </div>
          ) : (
            <div className="col text-center mb-5 mt-5">
              <h2>All Products</h2>
            </div>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-3 mb-5">
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="col">{JSON.stringify(products)}</div> */}
    </div>
  );
};

export default AllProducts;
