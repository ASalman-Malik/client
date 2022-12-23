import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//to get the slug by using react-router-dom
// import {useParams} from 'react-router-dom';
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import { getCategories, getCategorySubs } from "../../../functions/category";
import AdminNav from "../../../components/nav/AdminNav";
import FileUpload from "../../../components/forms/FileUpload";
import { getProduct, updateProduct } from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match, history }) => {
  //redux
  const { user } = useSelector((state) => ({ ...state }));

  //state
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  //router destructuring slug from match.params
  const { slug } = match.params;

  //react-router-dom fetching slug
  //   let {slug} = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => {
      //   console.log("Categories loading from MongoDB Atlas c.data", c.data);
      setCategories(c.data);
    });

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        // console.log("Single Product from pages/product/ProductUpdate.js Page Client",res);
        // step 1  loading single product
        setValues({ ...values, ...res.data });
        //  step 2 loading single porduct category sub
        getCategorySubs(res.data.category._id).then((resSubCat) => {
          setSubOptions(resSubCat.data); //on first load show default subs
        });
        // step 3 prepare arrays of sub Ids to show the default selected subs
        let arr = [];
        res.data.subs.map((s) => {
          arr.push(s._id);
        });
        // console.log("Array of Subs from DB", arr);
        setArrayOfSubs((prev) => arr); // required to work ant design preperly
      })
      .catch((err) =>
        console.log("Errom from pages/product/ProductUpdate.js Page", err)
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is update complete.`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log("Clicked Category from dropdown", e.target.value);
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      //   console.log("Subs Options on categry clicked", res.data);
      setSubOptions(res.data);
    });
    //loads old category if after making changes admin want to revert back to previous state
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]); //clearing old sub-categories from multi-select
  };

  return (
    <div className="contaner-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10 text-center mt-3">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Update Product Page</h4>
          )}
          {/* <h3>Update Product</h3> */}
          <hr />
          {/* {console.log("Product from state Values:--->", values)} */}

          <div className="mt-3 mb-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
