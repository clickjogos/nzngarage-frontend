import React, { Component } from "react";
import "./Filters.scss";


export default class Filters extends Component {

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
                        <label>{this.props.startDate}</label>
                        <label>{this.props.endDate}</label>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", color: "#414141" }}>Matérias</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>320</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", color: "#414141" }}>Audiência</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>{this.props.viewTarget}</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "16px", color: "#414141" }}>Orçamento</h4>
                        <p style={{ fontSize: "14px", color: "#8995A0" }}>{this.props.budget}</p>
                    </div>
                </div>
            </div>
        )
    }

}