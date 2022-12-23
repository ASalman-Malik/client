import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import  CategoryList  from "../components/category/CategoryList";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import SubList from "../components/sub/SubList";

const Home = () => {
 
  return (
    <>
      <div className="jumbotron h1 text-danger text-center font-weight-bold">
        <Jumbotron
          text={[
            "Fresh Arrivals",
            "Latest Products",
            "Best Products",
            "Genuine Products",
          ]}
        />
      </div>
      <h4 className="text-center jumbotron font-weight-bold display-4 p-3 mt-5">
        Fresh Arrivals
      </h4>
      <NewArrivals/>
      <h4 className="text-center jumbotron font-weight-bold display-4 p-3 mt-5">
        Best Seller
      </h4>
      <BestSellers/>
      <h4 className="text-center jumbotron font-weight-bold display-4 p-3 mt-5">
        Categories
      </h4>
      <CategoryList/>
      <h4 className="text-center jumbotron font-weight-bold display-4 p-3 mt-5">
        Sub Categories
      </h4>
      <SubList/>
      
    </>
  );
};

export default Home;
