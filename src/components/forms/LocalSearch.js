import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  // step:--3 create the function handleSearchChange()
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    //step:-2 input box for taking input to perform search on
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  );
};

export default LocalSearch;
