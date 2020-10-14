import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './RefinePlanning.scss'
import Back from '../../components/Button/Back'
import Forward from '../../components/Button/Button'
import InputLabel from '../../components/InputLabel/InputLabel'
import history from '../App/history'
import Pagination from '../../components/Pagination/Pagination'
import Filters from '../../components/Filters/Filters'
import { Redirect } from "react-router-dom";
import ContainerList from '../../components/ContainerList/ContainerList'
import Prediction from '../../components/Prediction/Prediction'

import data from '../../providers/mocks/data.json'
import * as planning from '../../providers/planning'

class refinePlanning extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: true,
			redirect: false,
			data: this.props.location.state,
			startDate: this.props.location.state.startDate,
			endDate: this.props.location.state.endDate,
			viewTarget: this.props.location.state.viewTarget,
            budget: this.props.location.state.budget,
			inference: this.props.location.state.inference,
			planningName: this.props.location.state.planningName
		}
		// console.log('mock', data.data)
		console.log('>>> props')
		console.log(this.props)
		console.log('>>> state')
		console.log(this.state)
		// console.log(data, 'JSON')
	}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log(">> Create refining page")
		console.log(this.state)
		this.setState({ show: false });
		let obj = { 	
			"planningName": this.state.planningName,
			"viewTarget": this.state.viewTarget,
			"startDate": this.state.startDate,
			"endDate": this.state.endDate,
			"budget": this.state.budget,
			"weekValues": this.state.inference
		}
		planning.savePlanning(obj).then( () => {
		  this.setState({ redirect:true });
		}).catch(error => {
		  alert(error)
		})
	  }
	render() {
		if (this.state.redirect) return <Redirect exact to={{ pathname: "/PlanningList"  }} />
		return (
			<div className="main">
				<Sidebar></Sidebar>
				{this.state.show ? (
					<>
						<div className="container-flex">
							<div className="container-back-two">
								<div className="adjust">
									<Back></Back>
									<p id="back-text"> Voltar para a Criação do Planejamento</p>
								</div>
							</div>
							<div className="container-refine">
								<Filters startDate={this.state.startDate} endDate={this.state.endDate} viewTarget={this.state.viewTarget} budget={this.state.budget} />

								<Prediction weeksValuesInference={this.state.inference} />
								{/* <ContainerList
                            callback={this.teste}
                            callforward={this.teste2}
                        /> */}

								{/* <button onClick={() => this.defineWeeek()}>Click Me</button>; */}
								<div className="next-step">
									<p style={{ fontSize: '14px', color: '#B8C2CB' }}>Passo 2 de 2</p>
									<div className="onlybutton">
										<Forward title="Rodar Planejamento ❯"></Forward>
										<button onClick={this.handleSubmit} > Salvar Planejamento ❯</button>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<h1> Carregando... </h1>
				)}
			</div>
		)
	}
}

export default refinePlanning