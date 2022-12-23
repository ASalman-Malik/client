import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import ProductCard from "../../components/cards/ProductCard";
import LoadingCard from "../../components/cards/LoadingCard";
import { getProducts, getProductsCount } from "../../functions/product";
import { showAverage } from "../../functions/rating";

const NewArrivals = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => {
      setProductsCount(res.data);
      // console.log(res.data);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page)
      .then((res) => {
        // console.log("Response Home Page", res.data)
        setProducts(res.data);
        setLoading(false);
      })
      .catch();
  };
  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-2 p-3">
          <Pagination
            className="text-center mt-5"
            defaultCurrent={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};
export default NewArrivals;
