import React from 'react';
import { Button } from 'antd';


const CategoryForm = ({handleSubmit, name, setName}) => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        {/* <label>Name</label> */}
        <br />
        <input
          type="text"
          placeholder="Category Name"
          className="form-control p-2 text-center"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <Button
          onClick={handleSubmit}
          //   block
          type="primary"
          shape="round"
          size="large"
        >
          SAVE
        </Button>
      </div>
    </form>
  );

  export default CategoryForm;