import React, { Component } from "react";
import "../../components/Sidebar/Sidebar.scss";
const planning = require("../../assets/icons/icon-planejamento.svg");
const acompanhamento = require("../../assets/icons/icon-acompanhamento.svg");
const logoNZN = require("../../assets/images/nzn.png");

export default class Sidebar extends Component {
  render() {
    return (
      <div class="sidebar">
        <div class="logo">
          <img src={logoNZN} height="44px" width="173px" />
        </div>
        <hr />
        <div class="icon-container">
          <p id="txtplan">CRIAR</p>
          <button
            className="buttonSidebar"
            onClick={() => this.props.callback()}
          >
            <img id="imgIcon" src={planning} height="16px" width="14px" />
            <p id="txtButtonPlan">Planejamento</p>
          </button>
          <br></br>

          <p id="txtplan">AVALIAR</p>
          <button
            className="buttonSidebar"
            onClick={() => this.props.callback()}
          >
            <img id="imgIcon" src={acompanhamento} height="16px" width="14px" />
            <p id="txtButtonGuide">Acompanhamento</p>
          </button>
        </div>

        <div id="footer">

          <div class="information-person">

            <p>Alana</p>
          </div>
        </div>


      </div>
    );
  }
}
