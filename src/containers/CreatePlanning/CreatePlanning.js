import React, { Component } from "react";
import ButtonBack from "../../components/Button/Back";

import Sidebar from "../../components/Sidebar/Sidebar";

import "bootstrap/dist/css/bootstrap.min.css";

import "./CreatePlanning.scss";
const Backbutton = require("../../assets/icons/icon-back-button.svg");

function CreatePanning() {
  return (
    <div class="main">
      <Sidebar />
    <div class="container-block">
    <div class="container-back">
      <button>
        <img src={Backbutton} icon={<img src={Backbutton} />} 
        />
      </button>
      <p id="back-text"> Voltar para a Lista de Planejamento</p>
    </div>
    
    <div class="teste">
      <h3>Criar novo Planejamento</h3>
      <h4>Vamos fazer isso em dois passos ;)</h4>
      </div>
      </div>
      </div>

  );
}

export default CreatePanning;
