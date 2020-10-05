// import React from 'react';
// export default function teste(){
//     return ( <h1>justin bieber lixo</h1>)}
import React, { Component } from "react";
// import * as authentication from "../../providers/authentication";

import InputLabel from "../../components/InputLabel/InputLabel";
import 'bootstrap/dist/css/bootstrap.min.css';

// import Button from "../../components/Button";
// import { Redirect } from "react-router-dom";
import "../Login/Login.scss";
const logoNZN = require("../../assets/images/logoNZN.png");


function Login() {

  
  return (
    <div className="container-login">
      <span className="banner">
        <p>HELP</p>
      </span>
      <div className="box-form">
        <img className="logo" alt="logo" src={logoNZN} />
        <form>
          <InputLabel label="E-mail" placeholder="exemplo@email.com.br" />
          <InputLabel label="Senha" placeholder="Senha de acesso"/>
        </form>
      </div>
    </div>
    

  )

}

export default Login;

