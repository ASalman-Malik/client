import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-large btn-aised btn-raised m-3"
      >
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="contaiiner">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading. . .</h4>
        ) : (
          showSubs()
        )}
      </div>
    </div>
  );
};
export default SubList;
