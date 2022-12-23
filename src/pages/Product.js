// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { getProduct, productStar } from "../functions/product";
// import SingleProduct from "../components/cards/SingleProduct";

// const Product = ({ match }) => {
//   const { user } = useSelector((state) => ({ ...state }));
//   const [product, setProduct] = useState({});
//   const { slug } = match.params;
//   const [star, setStar] = useState(0);

//   useEffect(() => {
//     loadSingleProduct();
//   }, [slug]);

//   useEffect(() => {
//     if (product.rating && user) {
//       let existingRatingObject = product.ratings.find(
//         (element) => element.postedBy.toString() === user._id.toString()
//       );
//       existingRatingObject && setStar(existingRatingObject.star); //current user star rating
//     }
//   });

//   const loadSingleProduct = () => {
//     getProduct(slug).then((res) => setProduct(res.data));
//   };

//   // const onStarClick = (newRating, name) => {
//   //   setStar(newRating);
//   //   // console.table(newRating, name);
//   //   productStar(name, star, user.token).then((res) => {
//   //     console.log("Rating clicked", res.data);
//   //     loadSingleProduct(); // to view updated rating in realtime
//   //   }).catch(err => console.log('Something WentWrong unable to rate', err));
//   // };
//   const onStarClick = (newRating, name) => {
//     setStar(newRating);
//     // console.table(newRating, name);
//     productStar(name, newRating, user.token).then((res) => {
//       console.log("rating clicked", res.data);
//       loadSingleProduct(); // if you want to show updated rating in real time
//     });
//   };

//   return (
//     <>
//       {/* {JSON.stringify(product)} */}
//       <div className="container-fluid">
//         <div className="row pt-4">
//           <SingleProduct
//             product={product}
//             onStarClick={onStarClick}
//             star={star}
//           />
//         </div>
//         <div className="row">
//           <div className="col pt-5 pb-5 text-center">
//             <hr />
//             <h4 className="jumbotron font-weight-bold display-4 p-3">
//               Related Products
//             </h4>
//             <hr />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Product;

import React, { useEffect, useState } from "react";
import { getProduct, productStar, getRelated } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star rating
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related aswell
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          {/* {JSON.stringify(related)} */}
          <hr />
          <h4 className="">Related Products</h4>
          <hr />
        </div>
      </div>
      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div className="col-md-4" key={r._id}>
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
