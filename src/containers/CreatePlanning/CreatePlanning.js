import React, { Component } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import InputLabelPlanning from "../../components/InputLabel/InputLabelPlanning";
import Button from "../../components/Button/Button";
import history from "../App/history";
import "./CreatePlanning.scss";
import { Redirect } from "react-router-dom";
import RefinePlanning from "../RefinePlanning/RefinePlanning"
import * as model from '../../providers/model'

const Backbutton = require("../../assets/icons/icon-back-button.svg");

class CreatePanning extends Component {
  // const [startDate, setStartDate] = useState(new Date());
  constructor(props) {
    super(props);

    this.state = {
      show: true
    }
    // handleClick = this.handleClick.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.setState({ show: false });
    this.setState({ redirect: true });
    model.makeInference(this.state).then(inference => {
      this.setState({ data: inference });
    }).catch(error => {
      alert(error)
    })
  }

  render() {
    if (this.state.redirect) return <Redirect exact to={{ pathname: "/refinePlanning", state: this.state }} />
    return (
      <div class="main">
        <Sidebar />
        {this.state.show ? (
          <>
            <div class="container-block">
              <div class="container-back">
                <button onClick={() => history.push("/planningList")}>
                  <img src={Backbutton} icon={<img src={Backbutton} />} />
                </button>
                <p id="back-text"> Voltar para a Lista de Planejamento</p>
              </div>

              <div class="container-planning">
                <h3 style={{ fontSize: "28px" }}>Criar novo Planejamento</h3>
                <h4 style={{ fontSize: "18px", color: "#636F7A" }}>
                  Vamos fazer isso em dois passos ;)
                </h4>
                <form onSubmit={this.handleSubmit}>

                  <InputLabelPlanning
                    callback={(e) => this.setState({ planningName: e })}
                    label="Nome do Planejamento"
                    placeholder="Nome do Planejamento"
                  />
                  <div class="flex-container">
                    <InputLabelPlanning
                      callback={(e) => this.setState({ startDate: e })}
                      label="Data Inicial"
                      type="date"
                    />
                    <InputLabelPlanning
                      callback={(e) => this.setState({ endDate: e })}
                      label="Data Final"
                      type="date"
                    />
                    <InputLabelPlanning
                      callback={(e) => this.setState({ viewTarget: e })}
                      label="Audiência"
                      placeholder="" />
                    <InputLabelPlanning
                      callback={(e) => this.setState({ budget: e })}
                      label="Orçamento"
                      placeholder="R$" />
                  </div>
                  <div class="container-step">
                    <p id="textStep">Passo 1 de 2</p>

                    <Button callback={() => this.handleSubmit} title="Ver Sugestão de Planejamento >" />
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
            <h1> Carregando... </h1>
          )}

      </div>
    );
  }
}

export default CreatePanning;
