import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './RefinePlanning.scss'
import Back from '../../components/Button/Back'
import Forward from '../../components/Button/Button'
import InputLabel from '../../components/InputLabel/InputLabel'
import history from '../App/history'
import Filters from '../../components/Filters/Filters'
import { Redirect } from 'react-router-dom'
import Prediction from '../../components/Prediction/Prediction'

import data from '../../providers/mocks/data.json'
import * as planning from '../../providers/planning'
import * as model from '../../providers/model'
const Backbutton = require('../../assets/icons/icon-back-button.svg')

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
			planningName: this.props.location.state.planningName,
		}
		console.log('>>> props')
		console.log(this.props)
		console.log('>>> state')
		console.log(this.state)
	}

	handleSubmit = (e) => {
		if (e == "" || !e) {
			e.preventDefault()
		}
		this.setState({ show: false })
		let obj = {
			planningName: this.state.planningName,
			viewTarget: this.state.viewTarget,
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			budget: this.state.budget,
			weekValues: this.state.inference,
		}
		planning
			.savePlanning(obj)
			.then(() => {
				this.setState({ redirect: true })
			})
			.catch((error) => {
				alert(error)
			})
	}

	handleModelSubmit = (e) => {
		this.setState({ show: false })

		model
			.makeSugestion({ weekValues: this.state.inference })
			.then((response) => {
				this.setState({ show: true, viewTarget: Math.round(response.data.totalAudience) })
			})
			.catch((error) => {
				alert(error)
			})
	}

	handleFormUpdate = () => {
		console.log("INFERENCEEEEE")
		console.log(this.state.inference)
		this.setState({ inference: this.state.inference })
	}

	render() {
		if (this.state.redirect) return <Redirect exact to={{ pathname: '/PlanningList' }} />
		return (
			<div className="main">
				<Sidebar></Sidebar>
				{this.state.show ? (
					<>
						<div className="container-flex">
							<div className="container-back-two">
								<div className="adjust">
									<button onClick={() => history.push('/createPlanning')}>
										<img src={Backbutton} icon={<img src={Backbutton} />} />
									</button>
									<p id="back-text"> Voltar para a Criação do Planejamento</p>
								</div>
							</div>
							<div className="container-refine">
								<Filters
									totalArticles={this.state.inference[0].totalQuantityNews}
									startDate={this.state.startDate}
									endDate={this.state.endDate}
									viewTarget={this.state.viewTarget}
									budget={this.state.budget}
								/>

								<Prediction
									weeksValuesInference={this.state.inference}
									onChange={this.handleFormUpdate.bind(this)}

								/>
								<div className="next-step">
									<p style={{ fontSize: '14px', color: '#B8C2CB' }}>Passo 2 de 2</p>
									<div className="onlybutton">
										{/* <Forward title="Rodar Planejamento ❯"></Forward> */}
										<button className="butaum" onClick={this.handleModelSubmit}>
											{' '}
											Rodar Planejamento ❯{' '}
										</button>
										<button className="butaum" onClick={this.handleSubmit}>
											{' '}
											Salvar Planejamento ❯
										</button>
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
