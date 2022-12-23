import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  //    loading prodcuts on page by default
  const loadAllProducts = () => {
      setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  //   loading products on search
  useEffect(() => {
    // console.log('Hello text changes', text)
    const delayed = setTimeout(() => {
        fetchProducts({ query: text });
    }, 500)
    return () => clearTimeout(delayed);
    
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 ">search/filter menu</div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-center text-danegr">Loading...</h4>
          ) : (
            <h4 className="text-center mt-5">Products</h4>
          )}
          {products.length < 1 && <p>No Products Found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
