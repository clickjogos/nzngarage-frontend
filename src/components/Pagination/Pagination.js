import React, { Component } from "react";
import "./Pagination.scss";
import InputLabel from "../../components/InputLabel/InputLabel";

export default class Pagination extends Component {

    render() {
        return (
            <div className="main-pagination">
                <div className="pagination">
                    <button onClick={() => this.props.callback()} id="back">❮</button>
                    <h5 style={{ fontStyle: "normal normal 600 18px/24px Proxima Nova;", fontSize: "18px", color: "#2944D9" }}>Semana 1 de 4</h5>
                    <button onClick={() => this.props.callforward()} id="forward">❯</button>
                </div>
            </div>
        )
    }
}