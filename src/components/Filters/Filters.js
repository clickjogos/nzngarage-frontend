import React, { Component } from "react";
import "./Filters.scss";

export default class Filters extends Component {
    constructor(props) {
        super(props)

        this.state = {
            totalArticles: props.totalArticles,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            viewTarget: this.props.viewTarget,
            budget: this.props.budget,
            modelBudget: this.props.modelBudget
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
                        <h4 style={{ fontSize: "16px", color: "#414141" }}>Período</h4>
                        <label>{this.state.startDate}</label>
                        <label>{this.state.endDate}</label>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", color: "#414141" }}>Matérias</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>{this.state.totalArticles}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", color: "#414141" }}>Audiência</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>{this.state.viewTarget}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", color: "#414141" }}>Orçamento Disponível</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>R$ {this.state.budget}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", color: "#414141" }}>Orçamento Planejado</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>R$ {this.state.modelBudget}</p>
                    </div>
                </div>
            </div>
        )
    }
}
