import React, { Component } from "react";
import "./Sidebar.scss";
import Image from "react-bootstrap/Image";
const planning = require("../../assets/icons/icon-planejamento.svg");
const acompanhamento = require("../../assets/icons/icon-acompanhamento.svg");
const logoNZN = require("../../assets/images/nzn-logo.png");
const Iconperson = require("../../assets/icons/iconfinder_Picture1_3289576.png");


export default class Sidebar extends Component {
  render() {
    return (
      <div class="sidebar">
        <div class="logo">
          <Image src={logoNZN} height="44px" width="173px" />
        </div>
        <hr />
        <div class="icon-container">
          <p id="txtplan">CRIAR</p>
          <button
            className="buttonSidebar"
            onClick={() => this.props.callback()}
              >
            <img id="imgIcon"src={planning} height="16px" width="14px" />
            <p id="txtButtonPlan">Planejamento</p>
          </button>
          <br></br>

          <p id="txtplan">AVALIAR</p>
          <button
            className="buttonSidebar"
            onClick={() => this.props.callback()}
              >
            <img id="imgIcon"src={acompanhamento} height="16px" width="14px" />
            <p id="txtButtonGuide">Acompanhamento</p>
          </button>
        </div>
       
        <div id="footer">


        <div class="information-person">
          
        {/* <Image src={logoNZN} style={{width: 20, height: 20, borderRadius: 400/ 2}}/> */}
        <p>Alana</p>
        </div>
        </div>
      

      </div>
    );
  }
}
