import React, { Component } from "react";
import "./Sidebar.scss";
import Image from "react-bootstrap/Image";
import history from "../../containers/App/history";
import LogoNZN from '../../assets/images/nzn.png'

const planning = require("../../assets/icons/icon-planejamento.svg");
const acompanhamento = require("../../assets/icons/icon-acompanhamento.svg");

export default class Sidebar extends Component {

  redirectPagePlanning = () => {
    history.push({
      pathname: "/createPlanning",
  });};

  redirectPageList = () => {
    history.push({
      pathname: "/planningList",
  });};


  render() {
    return (
      <div class="sidebar">
        <div class="logo">
        <img src={LogoNZN} height="44px" width="173px" />
        </div>
        <hr />
        <div class="icon-container">
          <p id="txtplan">CRIAR</p>
          <button
            className="buttonSidebar"
            onClick={() => this.redirectPagePlanning()}
              >
            <img id="imgIcon"src={planning} height="16px" width="14px" />
            <p id="txtButtonPlan">Planejamento</p>
          </button>
          <br></br>

          <p id="txtplan">AVALIAR</p>
          <button
            className="buttonSidebar"
            onClick={() => this.redirectPageList()}
              >
            <img id="imgIcon"src={acompanhamento} height="16px" width="14px" />
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
