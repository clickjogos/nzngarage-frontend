// import React from 'react';
// export default function teste(){
//     return ( <h1>justin bieber lixo</h1>)}
import React, { Component } from "react";
// import * as authentication from "../../providers/authentication";
import AccessButton from "../../components/Button/AccessButton"

// import Button from "../../components/Button";
// import { Redirect } from "react-router-dom";
// import  Button  from "../../components/Button/Button";
import "../Login/Login.scss";
const logoNZN = require("../../assets/images/logoNZN.png");

function Login() {

  
  return (
    <div className="container-login">
      <span className="banner">
        <p>HELP</p>
        <AccessButton></AccessButton>
      </span>
      <div className="box-form">
        <img className="logo" alt="logo" src={logoNZN} />
        <h1>Login</h1>
        <form>
          {/* <InputLabel label="Email or Phone Number" />
          <InputLabel label="Password" /> */}
        </form>
      </div>
    </div>

  )

}

export default Login;

