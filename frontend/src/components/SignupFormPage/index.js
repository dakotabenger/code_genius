import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import SignUp from "./SignUpForm";
function SignupFormPage() {
  
  return (
    <SignUp />
  );
}

export default SignupFormPage;
