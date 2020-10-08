import Sidebar from '../../components/Sidebar/Sidebar'
import React, { Component } from "react";
import "./RefinePlanning.scss";
import Button from '../../components/Button/Back'

function refinePlanning() {

    return (
        <div className="main">
            <Sidebar></Sidebar>
            <div className="container-block">
                <div className="container-back-two">
                    <div className="gambeta">
                        <Button>
                        </Button>
                        <p id="back-text"> Voltar para a Criação do Planejamento</p>
                    </div>
                </div>
                <div className="container-refine">
                    <div className="container-filters">
                        <div className="title">
                            <h3 style={{ fontSize: "28px" }}>Refinando o Planejamento</h3>
                            <h4 style={{ fontSize: "18px", color: "#636F7A" }}>Agora você pode refinar a sugestão de planejamento</h4>
                        </div>
                        <div className="filters">
                            <div>
                                <h4 style={{ fontSize: "16px", color: "#414141" }}>Período</h4>
                                <p style={{ fontSize: "14px", color: "#8995A0" }}>-- / -- / ---- até -- / -- / ----</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: "16px", color: "#414141" }}>Matérias</h4>
                                <p style={{ fontSize: "14px", color: "#8995A0" }}>320</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: "16px", color: "#414141" }}>Audiência</h4>
                                <p style={{ fontSize: "14px", color: "#8995A0" }}>117.034</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: "16px", color: "#414141" }}>Orçamento</h4>
                                <p style={{ fontSize: "14px", color: "#8995A0" }}>R$11.304</p>
                            </div>
                        </div>
                    </div>
                    <div className="pagination">
                        <div id="back">❮</div>
                        <div id="forward">❯</div>
                    </div>
                    <div className="main-container">
                    </div>
                </div>
            </div>
        </div>
    )

}

export default refinePlanning;