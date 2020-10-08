import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import InputLabel from "../../components/InputLabel/InputLabel";
import AccessButton from "../../components/Button/AccessButton";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundLogin from "../../assets/images/brand-illustration.png";

import "../Login/Login.scss";
import { Button } from "react-bootstrap";
const logoNZN = require("../../assets/images/logoNZN.png");

function Login() {
  return (
    <div class="main">
      <div class="login-information">
        <div class="logo">
          <Image src={logoNZN} height="44px" width="173px" />
//         </div>
        <div class="container">
        <div class="user-information">
          <p>Entrar</p>
          <InputLabel label="E-mail" placeholder="exemplo@email.com.br"/>
          <InputLabel label="Senha" placeholder="Senha de acesso"/>
        </div>
        <div class="box-button">
          <AccessButton title="Acessar conta" />
        </div>
        </div>
      </div>
      <div class="background-information">
      <h1>Mensurar o conhecimento e estimular o engajamento nunca foi tão simples</h1>
        <div class="containerImage">
          <Image src={backgroundLogin} height="544" width="727" />
        </div>
      </div>
    </div>
  );
}

export default Login;
