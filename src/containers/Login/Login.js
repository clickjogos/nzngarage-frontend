import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import InputLabel from "../../components/InputLabel/InputLabel";
import Button from "../../components/Button/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundLogin from "../../assets/images/brand-illustration.png";
import history from "../App/history";

import "../Login/Login.scss";
const logoNZN = require("../../assets/images/nzn-logo.png");

class Login extends Component {
  constructor(props) {
    super(props);

 
      this.handleClick = this.handleClick.bind(this);

    
  }
  handleClick() {
    console.log('Clicado');
  }

  render() {
    return (
      <div class="main">
        <div class="login-information">
          <div class="logo">
            <Image src={logoNZN} height="44px" width="173px" />
          </div>
          <div class="container">
            <div class="user-information">
              <p>Entrar</p>
              <InputLabel label="E-mail" placeholder="exemplo@email.com.br" />
              <InputLabel label="Senha" placeholder="Senha de acesso" />
            </div>
            <div class="box-button">
              {/* <Button title="Acessar conta" callback={() => this.handleClick}/> */}
              <button id="buttonRedirect"
              onClick={() => history.push("/create")}
            >
              Acessar conta
            </button>
            </div>
          
          </div>
        </div>
        <div class="background-information">
          <h1>
            Mensurar o conhecimento e estimular o engajamento nunca foi tão
            simples
          </h1>

          <div class="containerImage">
            <Image src={backgroundLogin} height="544" width="727" />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
