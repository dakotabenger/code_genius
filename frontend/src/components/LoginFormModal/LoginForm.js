import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import {useHistory} from "react-router-dom"
function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
     dispatch(sessionActions.login({ credential:"dakben", password:"password" })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    )        
     history.push("/home");
    ;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
     dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    )        
     history.push("/home");
    ;
  };

  return (
    <div style={{backgroundColor:"darkgray",height:"200px",display:"flex",justifyItems:"center"}}>
      <h1 style={{display:"flex",justifyItems:"center",textAlign:"center"}}>Log In</h1>
      <form style={{display:"flex",alignSelf:"center",justifySelf:"center",justifyContent:"center",alignItems:"center"}}onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
              Username or Email:<br></br>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password:<br></br>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br></br>
        </label><br></br>
          <button style={{display:"inline",margin:"5px",borderRadius:"8px",backgroundColor:"#897CFF",alignSelf:"flex-end",justifySelf:"space-around"}}type="submit">Log In</button>
          <button style={{display:"inline",margin:"5px",borderRadius:"8px",backgroundColor:"#897CFF",alignSelf:"flex-end",justifySelf:"space-around"}}type="submit" onClick={(e) => {handleDemoSubmit(e)}}>Demo Login</button>

      </form>
    </div>
  );
}

export default LoginForm;
