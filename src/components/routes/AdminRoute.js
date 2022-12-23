import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current Admin Response", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("Current admin Error", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Route {...rest} 
    // render={() => children} 
    />
  ) : (
    // <h1 className="text-dagner">Loading...</h1>
    <LoadingToRedirect />
  );
};

export default AdminRoute;
