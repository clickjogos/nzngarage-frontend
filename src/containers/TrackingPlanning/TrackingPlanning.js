import React, { Component } from 'react'
import Loading from '../../components/Loading/Loading'
import Sidebar from '../../components/Sidebar/Sidebar'
import Cards from '../../components/Cards/Cards'
import Button from '../../components/Button/Button'
import PredictionInformation from '../../components/PredictionInformation/PredictionInformation'

import './TrackingPlanning.scss'

import { isHead, isEditor } from '../../providers/authentication'
import * as tracking from '../../providers/tracking'
class TrackingPlanning extends Component {
	constructor(props) {
		super(props)
		this.state = {
			profile: JSON.parse(localStorage.getItem('user')).role,
			show: false		,
			periodIndex: 0	
		}
	}

	componentDidMount() {
		if(isEditor() === true) {
			this.getTrackingByPeriod('day')
		}
		else if(isHead() === true) {
			this.getTrackingByPeriod('week')
		}
	}
	getTrackingByPeriod(period) {
		console.log(period)
		// console.log(this.state.period)
		// this.setState({ show: false, period: period })
		// console.log(this.state.period)
		tracking
			.trackingByPeriod({ period: period })
			.then((response) => {
				this.setState({ show: true, tracking: response.data.data, period: period })
				// console.log('>>>>Tracking')
				// console.log(this.state.period)
				// console.log(this.state.tracking)
				// let realPoints1 = this.state.tracking.weekValues[0].realNews
				// let estimedPoint1 = this.state.tracking.weekValues[0].news
				// let realPoints2 = this.state.tracking.weekValues[0].realAudience
				// let estimedPoints2 = this.state.tracking.weekValues[0].audience
				// let realPoints3 = this.state.tracking.weekValues[0].realBudget
                // let estimedPoints3 = this.state.tracking.weekValues[0].budget
                // console.log("N E W S rea/extimate")
                // console.log(realPoints1, estimedPoint1)
                // console.log("A U D I E N C E rea/extimate")
                // console.log(realPoints2, estimedPoints2)
                // console.log("B U D G E T rea/extimate")
                // console.log(realPoints3, estimedPoints3)
			})
			.catch((error) => { })
	}
	handlePeriodSelection = (e, period) => {
		console.log(period)
		console.log(this.state.period)
		this.setState({ show: false, period: period })
		console.log(this.state.period)
		this.getTrackingByPeriod(period)
	}

	handlePeriodIndex = (e) => {
		// console.log("e", e)
		console.log("periodIndex before", this.state.periodIndex)
		this.setState({ periodIndex: e } , ()=>{
			console.log("periodIndex after", this.state.periodIndex)
		})
	}
	calculatePoints (real, plan) {
		let percentage = parseInt((100 * this.state.tracking.weekValues[this.state.periodIndex][real]) /this.state.tracking.weekValues[this.state.periodIndex][plan] )
		if(percentage == 100 ) {
			percentage = {progressBarWidth: { width: '100%' }}
		}
		else {
			percentage = {progressBarWidth: { width: `${percentage}%` }}
		}
		return {
			realPoints: this.state.tracking.weekValues[this.state.periodIndex][real],
			estimedPoints: this.state.tracking.weekValues[this.state.periodIndex][plan],
			percentage: percentage
		}
	}
	render() {
		return (
			<div className="main">
				<Sidebar />
				{this.state.show ? (
					<>
						<div className="container-flex-tracking">
							<div className="container-block-tracking">
								<div className="container-tracking">
									<div className="head-tracking">
										<div className="title-tracking">
											<h3 style={{ fontSize: '28px' }}>Visão Geral do Planejamento</h3>
											<h4 style={{ fontSize: '18px' }}>Você pode refinar a sugestão de planejamento</h4>
										</div>
										<div className="filters-tracking">
											<p>Visualizar:</p>
                                            <div className="button-filters-tracking">
											{isEditor() ? (<Button style={{width: '77px'}}title="Hoje" callback={(e) => this.handlePeriodSelection(e, 'day')}></Button>) : (<></>)}
											<Button style={{width: '99px'}}title="Semana" callback={(e) => this.handlePeriodSelection(e, 'week')}></Button>
											<Button style={{width: '165px'}} title="Planejamento Total" callback={(e) => this.handlePeriodSelection(e, 'all')}></Button>

											</div>
										</div>
									</div>
                                    <div className="cards-tracking">
										<Cards order= {'asc'} title="Matérias" 
										realPoints={this.state.tracking.weekValues[this.state.periodIndex].realNews} 
										estimedPoints={this.state.tracking.weekValues[this.state.periodIndex].planNews} 
										expectedPoints={this.state.tracking.weekValues[this.state.periodIndex].expectedNews}
										/>
										<Cards order= {'asc'} title="Audiência" 
										realPoints={this.state.tracking.weekValues[this.state.periodIndex].realAudience} 
										estimedPoints={this.state.tracking.weekValues[this.state.periodIndex].planAudience} 
										expectedPoints={this.state.tracking.weekValues[this.state.periodIndex].expectedAudience} />
										<Cards order= {'desc'} title="Orçamento" 
										realPoints={this.state.tracking.weekValues[this.state.periodIndex].realBudget} 
										estimedPoints={this.state.tracking.weekValues[this.state.periodIndex].planBudget} 
										expectedPoints={this.state.tracking.weekValues[this.state.periodIndex].expectedBudget}/>
										{/* <Cards title="Matérias" points={this.calculatePoints('realNews', 'planNews')} />
										<Cards title="Audiência" points={this.calculatePoints('realAudience', 'planAudience')} />
										<Cards title="Orçamento" points={this.calculatePoints('realBudget', 'planBudget')} /> */}

									</div>
									<div className="prediction-tracking">
										<PredictionInformation
											tracking={this.state.tracking}
											period={this.state.period}
											onChange={this.handlePeriodIndex.bind(this)}
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
						<Loading />
					)}
			</div>
		)
	}
}

export default TrackingPlanning
