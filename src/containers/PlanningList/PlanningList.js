import React, { Component } from 'react'
import "./PlanningList.scss"
import PlanningButton from '../../assets/images/new-planning-button.svg'
import Activated from '../../assets/images/icon-active.svg'
import Deactivated from '../../assets/images/icon-desactive.svg'
import Sidebar from "../../components/Sidebar/Sidebar";
import MoreOptions from "../../assets/images/icon-more-options.svg"

export default class PlanningList extends Component {
    render() {
      return (
          <div className="main">
              <Sidebar/>
            <div className="title">
                <h1>Planejamentos</h1>
                <span class = "planning-count"> 3 </span>
            </div>
                <div className="new-planning">
                    <div className="container-image">
                    <img src={PlanningButton} alt=""/>
                    </div>
                    <h2 className="planning-title">Criar novo planejamento</h2>
                </div>
                <div className="theme-list">
                    <ul>
                        <li className="theme-list-activated">
                            <span className="dates">20/04 até 20/05</span>
                            <h2 className="card-name">Cultura Interna</h2>
                            <div className="status-option">
                                <div className="status">
                                    <img src={Activated} alt="status image"/>
                                    <span>Ativado</span>
                                    </div>
                                <div className="option">
                                <img src={MoreOptions} alt=""/>
                                </div>
                            </div>
                        </li>
                        <li className="theme-list-deactivated">
                            <span className="dates">20/04 até 20/05</span>
                            <h2 className="card-name">Cultura Interna</h2>
                            <div className="status-option">
                                <div className="status">
                                    <img src={Deactivated} alt="status image"/>
                                <span>Desativado</span>
                                </div>
                                <div className="option">
                                <img src={MoreOptions} alt="e"/>
                                </div>
                            </div>
                        </li>
                        <li className="theme-list-deactivated">
                            <span className="dates">20/04 até 20/05</span>
                            <h2 className="card-name">Cultura Interna</h2>
                            <div className="status-option">
                                <div className="status">
                                    <img src={Deactivated} alt=""/>
                                <span>Desativado</span>
                                </div>
                                <div className="option">
                                <img src={MoreOptions} alt=""/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
        </div>
      );
    }
  }
  