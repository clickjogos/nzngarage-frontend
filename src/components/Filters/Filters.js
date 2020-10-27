import React, { Component } from "react";
import "./Filters.scss";

export default class Filters extends Component {
    constructor(props) {
        super(props)



        this.state = {
            totalArticles: props.totalArticles,
            startDate: this.props.startDate.split("-")[2] + "/" + this.props.startDate.split("-")[1] + "/" + this.props.startDate.split("-")[0],
            endDate: this.props.endDate.split("-")[2] + "/" + this.props.endDate.split("-")[1] + "/" + this.props.endDate.split("-")[0],
            viewTarget: this.props.viewTarget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
            budget: this.props.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
            modelBudget: this.props.modelBudget ? this.props.modelBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0
        }

    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ totalArticles: props.totalArticles })
    }

    render() {
        return (
            <div className="container-filters">
                <div className="title-refine">
                    <h3 style={{ fontSize: "28px" }}>Refinando o Planejamento</h3>
                    <h4 style={{ fontSize: "18px", color: "#636F7A" }}>Agora você pode refinar a sugestão de planejamento</h4>
                </div>
                <div className="filters">
                    <div>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "#414141" }}>Período</h4>
                        <p style={{ fontSize: "12px", color: "#8995A0" }}>{this.state.startDate} até {this.state.endDate}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "#414141" }}>Matérias</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>{this.state.totalArticles}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "#414141" }}>Audiência</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>{this.state.viewTarget}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "#414141" }}>Orçamento Disponível</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>R$ {this.state.budget}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", fontWeight: "bold", color: "#414141" }}>Orçamento Planejado</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>R$ {this.state.modelBudget}</p>
                    </div>
                </div>
            </div>
        )
    }
}
