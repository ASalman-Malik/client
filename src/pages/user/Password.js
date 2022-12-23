import React, { useState } from "react";
import { toast } from "react-toastify";

import { auth } from "../../firebase";
import UserNav from "../../components/nav/UserNav";
import { Button } from "antd";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true)
    //   console.log('New Password Entered By User at Password.js Page', password);
    await auth.currentUser.updatePassword(password)
    .then(()=>{
        setLoading(false)
        setPassword('')
        toast.success('Password updated sucessfully')
    })
    .catch((error)=>{
        setLoading(false)
        toast.error('error.message')

    })

  }

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter your New Password"
          disabled={loading}
          value={password}
        ></input>
        {/* <button className="btn btn-primary">Submit</button> */}
        <Button
        onClick={handleSubmit}
        block
        size="large"
        type="primary"
        shape="round"
        disabled={!password || password.length < 6 || loading}
        
        >Submit</Button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col pt-5">
            {loading ? <h5 className="text-danger">Loading. . .</h5> : <h5>Password Update</h5> }
          
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
