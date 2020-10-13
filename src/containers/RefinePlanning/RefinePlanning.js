import React, { Component } from "react";
import Sidebar from '../../components/Sidebar/Sidebar'
import "./RefinePlanning.scss";
import Back from '../../components/Button/Back'
import Forward from '../../components/Button/Button'
import InputLabel from '../../components/InputLabel/InputLabel'
import history from "../App/history";
import Pagination from "../../components/Pagination/Pagination"
import Filters from "../../components/Filters/Filters"

class refinePlanning extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            data: this.props.location.state,
            startDate: this.props.location.state.startDate,
            endDate: this.props.location.state.endDate,
            viewTarget: this.props.location.state.viewTarget,
            budget: this.props.location.state.budget
        }

        console.log(this.props)
        console.log(this.state.data, "DATA")

        console.log(this.state.startDate, "data")
        console.log(this.state.budget, "budget")
    }

    render() {
        return (
            <div className="main">
                <Sidebar></Sidebar>
                <div className="container-flex">
                    <div className="container-back-two">
                        <div className="adjust">
                            <Back></Back>
                            <p id="back-text"> Voltar para a Criação do Planejamento</p>
                        </div>
                    </div>
                    <div className="container-refine">

                        {/* <Filters
                        /> */}
                        {/* <div className="container-filters">
                            <div className="title-refine">
                                <h3 style={{ fontSize: "28px" }}>Refinando o Planejamento</h3>
                                <h4 style={{ fontSize: "18px", color: "#636F7A" }}>Agora você pode refinar a sugestão de planejamento</h4>
                            </div>
                            <div className="filters">
                                <div>
                                    <h4 style={{ fontSize: "16px", color: "#414141" }}>Período</h4>
                                    <label>{this.state.data.startDate}</label>
                                    <label>{this.state.data.endDate}</label>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: "16px", color: "#414141" }}>Matérias</h4>
                                    <p style={{ fontSize: "14px", color: "#8995A0" }}>320</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: "16px", color: "#414141" }}>Audiência</h4>
                                    <p style={{ fontSize: "14px", color: "#8995A0" }}>{this.state.data.viewTarget}</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: "16px", color: "#414141" }}>Orçamento</h4>
                                    <p style={{ fontSize: "14px", color: "#8995A0" }}>{this.state.data.budget}</p>
                                </div>
                            </div>
                        </div> */}
                        <Pagination />
                        <div className="next-step">
                            <p style={{ fontSize: "14px", color: "#B8C2CB" }}>Passo 2 de 2</p>
                            <div className="onlybutton">
                                <Forward title="Rodar Planejamento ❯"></Forward>
                                <Forward title="Salvar Planejamento ❯"></Forward>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default refinePlanning;