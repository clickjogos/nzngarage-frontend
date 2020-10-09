import React, { Component } from 'react'
import './PlanningList.scss'
import PlanningButton from '../../assets/images/new-planning-button.svg'
import Activated from '../../assets/images/icon-active.svg'
import Deactivated from '../../assets/images/icon-desactive.svg'
import Sidebar from '../../components/Sidebar/Sidebar'
import MoreOptions from '../../assets/images/icon-more-options.svg'

import * as format from "../../utils/format";
import * as planning from '../../providers/planning'

export default class PlanningList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
         }
         console.log(">>> props")
         console.log(this.props)
         console.log(">>> state")
         console.log(this.state)
      }

	componentDidMount() {		
        this.allRequest()
    }
    
    async allRequest() {
        try {
            const planningList = await planning.listPlannings()            

            this.setState({
                planningList: planningList.data.data,   
                show: true,
            })            
        } catch (error) { }
    }

    formatDate(date) {
        return (<>{format.reformatDate(date)} </>)
    }

	render() {
		return (
			<div className="main">
				<Sidebar />
                {this.state.show ? (
                    <>
                    <div className="title">
                        <h1>Planejamentos</h1>
                        <span class="planning-count" > {this.state.planningList.length} </span>
                    </div>
                    <div className="new-planning">
                        <div className="container-image">
                            <img src={PlanningButton} alt="" />
                        </div>
                        <h2 className="planning-title">Criar novo planejamento</h2>
                    </div>
                    <div className="theme-list">
					<ul>
                    {this.state.planningList.map(planning => { 
                        if( planning.status ){
                            return (<li key={planning['_id']} className="theme-list-activated">
                            <span className="dates">{this.formatDate(planning.startDate)} até {this.formatDate(planning.endDate)}</span>
                            <h2 className="card-name">{planning.planningName}</h2>
                            <div className="status-option">
                                <div className="status">
                                    <img src={Activated} alt="status image" />
                                    <span>Ativado</span>
                                </div>
                                <div className="option">    
                                    <img src={MoreOptions} alt="" />
                                </div>
                            </div>
                         </li>)
                        } else {
                           return  (<li key={planning['_id']} className="theme-list-deactivated">
							<span className="dates">{this.formatDate(planning.startDate)} até {this.formatDate(planning.endDate)}</span>
							<h2 className="card-name">{planning.planningName}</h2>
							<div className="status-option">
								<div className="status">
									<img src={Deactivated} alt="status image" />
									<span>Desativado</span>
								</div>
								<div className="option">
									<img src={MoreOptions} alt="e" />
								</div>
							</div>
						</li>)
                        }                    
                        })}
                    
                    </ul>
				</div>
                </>
                ) : (
                   <h1> Carregando... </h1>
                  )}
			</div>
		)
	}
}
