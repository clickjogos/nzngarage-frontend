import React, { Component } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import InputLabelPlanning from "../../components/InputLabel/InputLabelPlanning";
import Button from "../../components/Button/Button";
import history from "../App/history";
import "./CreatePlanning.scss";
import { Redirect } from "react-router-dom";
import RefinePlanning from "../RefinePlanning/RefinePlanning";
import * as model from "../../providers/model";

import data from "../../providers/mocks/data.json";
const Backbutton = require("../../assets/icons/icon-back-button.svg");

class CreatePanning extends Component {
  // const [startDate, setStartDate] = useState(new Date());
  constructor(props) {
    super(props);

    this.state = {
      show: true

    };
    console.log("props", this.props);
    console.log("state aqui do create", this.state);


  }

  handleSubmit = (e) => {

    if(e == "" || !e){
			e.preventDefault()
		}
		this.setState({ show: false })
		let obj = {
			id: this.state.planning.id,
		
		}
		
			.getPlanning(obj)
			.then(() => {
				this.setState({ redirect: true })
			})
			.catch((error) => {
				alert(error)
      })
      
    e.preventDefault();
    console.log(">> Create planning page");
    console.log(this.state);
    this.setState({ show: false });
    this.setState({ redirect: true });
    // model.makeInference(this.state).then(inference => {
    this.setState({ inference: data.data });
    // }).catch(error => {
    //   alert(error)
    // })






  };
  

  render() {
    if (this.state.redirect)
      return (
        <Redirect
          exact
          to={{ pathname: "/refinePlanning", state: this.state }}
        />
      );
    return (
      <div className="main">
        <Sidebar />
        {this.state.show && !this.props.location.state? (
          <>
            <div className="container-block">
              <div className="container-back">
                <button onClick={() => history.push("/planningList")}>
                  <img src={Backbutton} icon={<img src={Backbutton} />} />
                </button>
                <p id="back-text"> Voltar para a Lista de Planejamento</p>
              </div>

              <div className="container-planning">
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
                  <div className="flex-container">
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
                      placeholder=""
                    />
                    <InputLabelPlanning
                      callback={(e) => this.setState({ budget: e })}
                      label="Orçamento"
                      placeholder="R$"
                    />
                  </div>
                  <div className="container-step">
                    <p id="textStep">Passo 1 de 2</p>

                    <Button
                      callback={() => this.handleSubmit}
                      title="Ver Sugestão de Planejamento >"
                    />
                  </div>
                </form>
              </div>
            </div>
          </>
        )  : this.props.location.state.edit == true?        (

          <>
          <div className="container-block">
            <div className="container-back">
              <button onClick={() => history.push("/planningList")}>
                <img src={Backbutton} icon={<img src={Backbutton} />} />
              </button>
              <p id="back-text"> Voltar para a Lista de Planejamento</p>
            </div>

            <div className="container-planning">
              <h3 style={{ fontSize: "28px" }}>Editar Planejamento</h3>
              <h4 style={{ fontSize: "18px", color: "#636F7A" }}>
                Vamos fazer isso em dois passos ;)
              </h4>
              <form onSubmit={this.handleSubmit}>
                <InputLabelPlanning
                	value={this.props.location.state.planning.data.planningName}
                  placeholder="Nome do Planejamento"
                />
                <div className="flex-container">
                  <InputLabelPlanning
                  value={this.props.location.state.planning.data.startDate}

                    label="Data Inicial"
                    type="date"
                  />
                  <InputLabelPlanning
                  value={this.props.location.state.planning.data.endDate}
                  label="Data Final"
                    type="date"
                  />
                  <InputLabelPlanning
                    value={this.props.location.state.planning.data.viewTarget}

                    placeholder=""
                  />
                  <InputLabelPlanning
                    value={this.props.location.state.planning.data.budget}
                    placeholder="R$"
                  />
                </div>
                <div className="container-step">
                  <p id="textStep">Passo 1 de 2</p>

                  <Button
                    callback={() => this.handleSubmit}
                    title="Ver Sugestão de Planejamento >"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
        )
        
        : (
          <h1> Carregando... </h1>
        )}


      </div>
    );
  }
}

export default CreatePanning;
