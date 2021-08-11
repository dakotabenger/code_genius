import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';




function DemoButton() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("demo@user.io");
    const [password, setPassword] = useState("password");
    const [errors, setErrors] = useState([]);
    if (sessionUser) return <Redirect to="/" />;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password }))
        .catch((res) => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    };
  
    return (
     <button className="formButton"onClick={handleSubmit}>Demo Login</button>
    );
  }
  
  export default DemoButton;
  