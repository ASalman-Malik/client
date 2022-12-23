import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log("Total Number of people who have given rating to this product:-->", length);
    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log("Total reduced star: -->", totalReduced);
    let highest = length * 5;
    // console.log("Highest Start rating: -->", highest);
    let result = (totalReduced * 5) / highest;
    // console.log("Result of start rating:-->", result);

    return (
      <div className="text-center  pt-1 pb-3">
        <span className="text-danger">
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            editable={false}
            rating={result}
          />{" "}
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};
