import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from '@ant-design/icons'

import { createProduct } from "../../../functions/product";

import AdminNav from "../../../components/nav/AdminNav";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  // sold: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));
  //   //   console.log('User Token from ProductCreate Page',user.token)

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () =>
    getCategories().then((c) => {
      //   console.log("Categories loading from MongoDB Atlas", c.data);
      setValues({ ...values, categories: c.data });
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        // setLoading(false);
        // toast.success(`${res.data.title} is created sucessfylly.`);
        window.alert(`${res.data.title} is created sucessfully.`);
        window.location.reload();
      })
      .catch((err) => {
        // console.log("Error while creating new product", err);
        // setLoading(false);
        // if (err.response.status === 400) toast.error(err.response.data.err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    //
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, "------>", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category from dropdown", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("Subs Options", res.data);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        {/* {JSON.stringify(values.images)} */}
        {/* {JSON.stringify(values.categories)} */}
        {/* <div className='col text-center pt-5'>
                      {
                          loading ?
                          (
                              <h4 className='text-danger'>Loading...</h4>
                          ) :
                          (
                              <h4>Create Product</h4>
                          )
                      }
                  </div> */}
        <div className="col-md-10 text-center mt-3">
         { loading ? (<LoadingOutlined className='text-danger h1' />) : (<h4>Create Product Page</h4>)} 
          <hr />
          <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
          <ProductCreateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
          
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
