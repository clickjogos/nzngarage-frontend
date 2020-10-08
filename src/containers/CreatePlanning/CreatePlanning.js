import React, { Component } from "react";
import ButtonBack from "../../components/Button/Back";
import Sidebar from "../../components/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import InputLabelPlanning from "../../components/InputLabel/InputLabelPlanning";
import ButtonAcess from "../../components/Button/AccessButton";

import "./CreatePlanning.scss";


const Backbutton = require("../../assets/icons/icon-back-button.svg");



function CreatePanning() {
  // const [startDate, setStartDate] = useState(new Date());

  return (
    <div class="main">
      <Sidebar />
      <div class="container-block">
        <div class="container-back">
          <button>
            <img src={Backbutton} icon={<img src={Backbutton} />} />
          </button>
          <p id="back-text"> Voltar para a Lista de Planejamento</p>
        </div>

        <div class="container-planning">
          <h3 style={{ fontSize: "28px" }}>Criar novo Planejamento</h3>
          <h4 style={{ fontSize: "18px", color: "#636F7A" }}>
            Vamos fazer isso em dois passos ;)
          </h4>
      
          <InputLabelPlanning label="Nome do Planejamento" placeholder="Mês de Outubro"/>
          <div class="flex-container">
          <InputLabelPlanning label="Data Inicial" placeholder="Senha de acesso"  type="date"/ >
          <InputLabelPlanning label="Data Final" placeholder="Senha de acesso"  type="date"/  >
          <InputLabelPlanning label="Audiência" placeholder=""  /  >
          <InputLabelPlanning label="Orçamento" placeholder="R$" /  >

            </div>
        <div class="container-step">

          <p id="textStep">Passo 1 de 2</p>

        <button id="buttonPlanning"type="submit">Ver Sugestão de Planejamento ❯</button>

        </div>

        </div>
      </div>
    </div>
  );
}

export default CreatePanning;
