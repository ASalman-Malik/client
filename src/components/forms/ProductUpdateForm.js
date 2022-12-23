import React from "react";
import { Button, Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleChange,
  handleSubmit,
  values,
  setValues,
  handleCategoryChange,
  subOptions,
  categories,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  //   destructuring values from state
  const {
    title,
    description,
    price,
    category,
    shipping,
    subs,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  
  return (
    <form onSubmit={handleSubmit}>
      {/* {console.log("From ProductUpdateForm.js", title)} */}
      <div className="form-group">
        <label>Title</label>
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          autoFocus={true}
          value={title}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          className="form-control"
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={description}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          className="form-control"
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={price}
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping === "Yes" ? "Yes" : "No"}
          className="form-control"
          name="shipping"
          onChange={handleChange}
        >
          <option name="No">No</option>
          <option name="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          className="form-control"
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
          value={quantity}
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select
          value={color}
          className="form-control"
          name="color"
          onChange={handleChange}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select
          value={brand}
          className="form-control"
          name="brand"
          onChange={handleChange}
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          placeholder="plese select"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : ""}
        >
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

      <div className="form-control">
        <label>Sub-Categories</label>
        <Select
          className="form-control mb-3"
          placeholder="Please Select"
          mode="multiple"
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <Button
        onClick={handleSubmit}
        // block
        type="primary"
        size="large"
        shape="round"
      >
        UPDATE
      </Button>
      {/* {categories.length} */}
    </form>
  );
};

export default ProductUpdateForm;
