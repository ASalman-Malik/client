import React from "react";
import { Button, Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleChange,
  handleSubmit,
  values,
  setValues,
  handleCategoryChange,
  subOptions,
  showSub,
}) => {
  //   destructuring values from state
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
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
          className="form-control"
          name="shipping"
          onChange={handleChange}
        >
          <option>Please Select</option>
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
        <label>Brand</label>
        <select className="form-control" name="brand" onChange={handleChange}>
          <option>Please Select Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Color</label>
        <select className="form-control" name="brand" onChange={handleChange}>
          <option>Please Select Color</option>
          {colors.map((brand) => (
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
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option>Please Select Category</option>
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

      {showSub && (
      <div className="form-control">
        <label>Sub-Categories</label>
        <Select
          className="form-control mb-3"
          placeholder="Please Select"
          mode="multiple"
          value={subs}
          onChange={(value) => setValues({ ...values, subs: value })}
        >
          
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
        </Select>
      </div>
      )}


      {/* {JSON.stringify(values.subs)} */}
      {/* {subOptions ? subOptions.length : "No selection made yet"} */}
      <Button
        onClick={handleSubmit}
        block
        type="primary"
        size="large"
        shape="round"
      >
        SAVE
      </Button>
      {/* {categories.length} */}
    </form>
  );
};
export default ProductCreateForm;
