import React, { Component } from "react";
import Sidebar from '../../components/Sidebar/Sidebar'
import "./RefinePlanning.scss";
import Back from '../../components/Button/Back'
import Forward from '../../components/Button/Button'
import InputLabel from '../../components/InputLabel/InputLabel'
import history from "../App/history";
import Pagination from "../../components/Pagination/Pagination"
import Filters from "../../components/Filters/Filters"
import ContainerList from "../../components/ContainerList/ContainerList"
import * as data from '../../providers/mocks/data.json'


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
        console.log("mock", data.data)

    }

    teste() {
        alert("ooi")
    }
    teste2() {
        alert("forward 2")
    }

    defineWeeek() //receber parametro do componente pagination
    {
        let result
        data.data.map(week => {
            result = week.week
        })
        console.log(result)

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

                        <Filters
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            viewTarget={this.state.viewTarget}
                            budget={this.state.budget}
                        />
                        <Pagination
                            callback={this.teste}
                            callforward={this.teste2}
                        />


                        <button onClick={() => this.defineWeeek()}>Click Me</button>;
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