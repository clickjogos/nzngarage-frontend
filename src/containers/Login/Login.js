
// import React from 'react';
// export default function teste(){
//     return ( <h1>justin bieber lixo</h1>)}
import React, { Component } from "react";
// import * as authentication from "../../providers/authentication";
import InputLabel from "../../components/InputLabel/InputLabel";
// import Button from "../../components/Button";
// import { Redirect } from "react-router-dom";
import "../Login/Login.scss";
// const logoNZN = require("../../assets/images/logo-NZN.svg");
// const passwordIcon = require("../../assets/icons/see-password.svg");
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      visible: false,
      error: false
    };
  }
//   componentDidMount() {
//     // if (authentication.isLogin()) {
//       this.setState({ redirect: true })
//     }
//   }
  signIn = (e) => {
    e.preventDefault();
    const obj = {
      email: this.state.email,
      password: this.state.password
    };
    // authentication
    //   .verifyAuth(obj)
    //   .then((response) => {
    //     if (response.data.autenticado) {
    //       authentication.saveLogin(response.data);
    //       this.setState({ redirect: true });
    //     } else {
    //       alert("Usuario não cadastrado");
    //     }
    //   })
    //   .catch((err) => {});
    // Provisory
//     if (obj.email === 'admin@admin.com' && obj.password === 'password') {
//       authentication.saveLogin({ email: obj.email });
//       this.setState({ redirect: true });
//     } else {
//       this.setState({ error: true })
//     }
//   };
//   _handleInput = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   }; 
function teste(){
    // if (this.state.redirect) return <Redirect exact to="/curationship" />;
    return(
      <div className="container-login">
        <span className="banner">
          <p>HELP</p>
        </span>
        <div className="box-form">
          {/* <img className="logo" alt="logo" src={logoNZN} />
            <h1>Login to your Curator Dashboard account</h1>
            :
            // <h1>Invalid user or Incorrect password</h1>} */}
          <form>
            <InputLabel
              // callback={(e) => this.setState({ email: e })}
              label="Email or Phone Number"
            />
            <InputLabel
              // callback={(e) => this.setState({ password: e })}
              // icon={
              //   // <img
              //   //   onClick={() =>
              //   //     this.setState({ visible: !this.state.visible })
              //   //   }
              //   //   alt="password"
              //   //   src={passwordIcon}
              //   // />
              // }
              // type={this.state.visible ? 'text' : 'password'}
              label="Password"
            />
         </form>
  </div>
      </div>
    );

          }
        }
      }