import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { LoadingOutlined } from '@ant-design/icons'

import { createSub, getSub, getSubs, removeSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";

import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = (e) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); //list of categories availabe in dropdowm
  const [category, setCategory] = useState(""); //user's selected category from dropdown
  const [subs, setSubs] = useState([]); //list of sub-categories

  // Searching and Filtering
  // Step:--1
  // set keyword
  const [keyword, setKeyword] = useState("");

  // step:--4
  // functon which windowll be used on map
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) =>
      //   console.log("Categories loading from MongoDB Atlas", c.data);
      setCategories(c.data)
    );

  const loadSubs = () =>
    getSubs().then((s) =>
      // console.log("Sub-Categories loading from MongoDB Atlas", s.data)
      setSubs(s.data)
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("New Category Name which is about to create is:-", name);
    // console.log("user firebase token obtained from redux state", user.token);
    setLoading(true);

    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setCategories("");
        toast.success(`${res.data.name} is created sucessfylly.`);
        loadSubs();
      })
      .catch((err) => {
        console.log("Error while creating new category", err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure? You want to Delete!?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} is Deleted.`);
          loadSubs();
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
        <div className="col text-center pt-5">
          {loading ? (
            // <h4 className="text-danger">Loading..</h4>
            <LoadingOutlined className='text-danger h1'/>
          ) : (
            <h4>Create Sub-Category</h4>
          )}

          <div className="form-group">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
            </select>
          </div>

          {/* Using the same form component for manipulating sub-category and there is no difference in sub-category/category form */}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          {/* <hr /> */}
          {/* step:-3 and 4 moved to LoaclSearch Component for reuse*/}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subs
            .filter(searched(keyword))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((s) => (
              <div className="alert alert-secondary" key={s._id}>
                {s.name}
                <span
                  onClick={() => handleRemove(s.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/sub/${s.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
