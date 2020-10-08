import React, { Component } from 'react'
import "./PlanningList.scss"
import PlanningButton from '../../assets/images/new-planning-button.svg'
import Activated from '../../assets/images/icon-active.svg'
import Deactivated from '../../assets/images/icon-desactive.svg'

export default class PlanningList extends Component {
    render() {
      return (
          <div className="main">

            <div className="title">
                <h1>Planejamentos</h1>
                <span class = "planning-count"> 3 </span>
            </div>    
                <div className="new-planning">
                    <div className="container-image">
                    <img src={PlanningButton} alt="planning button image"/>
                    </div>
                    <h2 className="planning-title">Criar novo planejamento</h2>
                </div>
                <div className="theme-list">
                    <ul>
                        <li className="theme-list-activated">
                            <span>20/04 até 20/05</span>
                            <h2>Cultura Interna</h2>
                            <div className="status-option">
                                <div className="status"><img src={Activated} alt="status image"/></div><span className="status">Ativado</span>
                            </div>
                        </li>
                        <li className="theme-list-deactivated">
                            <span>20/04 até 20/05</span>
                            <h2>Cultura Interna</h2>
                            <div className="status-option">
                                <div className="status"><img src={Deactivated} alt="status image"/></div><span className="status">Desativado</span>
                            </div>
                        </li>
                        <li className="theme-list-deactivated">
                            <span>20/04 até 20/05</span>
                            <h2>Cultura Interna</h2>
                            <div className="status-option">
                                <div className="status"><img src={ Deactivated} alt="status image"/></div><span className="status">Desativado</span>
                            </div>
                        </li>
                    </ul>
                </div>
        </div>
      );
    }
  }
  