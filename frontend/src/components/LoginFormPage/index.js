import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import DemoButton from "./DemoButton";
import LoginForm from "./LoginForm";

function LoginFormPage() {

  return (
    <LoginForm></LoginForm>
  );
}

export default LoginFormPage;
