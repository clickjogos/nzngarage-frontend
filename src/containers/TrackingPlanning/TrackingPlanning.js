import React, { Component } from 'react'
import Loading from '../../components/Loading/Loading'
import Sidebar from '../../components/Sidebar/Sidebar'
import Cards from '../../components/Cards/Cards'
import Button from '../../components/Button/Button'
import PredictionInformation from '../../components/PredictionInformation/PredictionInformation'
import Modal from '../../components/Modal/Modal'
import './TrackingPlanning.scss'
import { isHead, isEditor } from '../../providers/authentication'
import history from '../App/history'
import * as tracking from '../../providers/tracking'
import * as planning from '../../providers/planning'

class TrackingPlanning extends Component {
	constructor(props) {
		super(props)
		this.state = {
			profile: JSON.parse(localStorage.getItem('user')).role,
			show: false,
			periodIndex: 0,
			isInitial: true,
		}
	}

	componentDidMount() {
		if (isEditor() === true) {
			this.getTrackingByPeriod('day')
		} else if (isHead() === true) {
			this.getTrackingByPeriod('week')
		}
	}

	handlePeriodSelection = (e, period) => {
		this.setState({ show: false, period: period, periodIndex: 0 })
		this.getTrackingByPeriod(period)
	}

	getTrackingByPeriod(period) {
		console.log(period)
		tracking
			.trackingByPeriod({ period: period })
			.then((response) => {
				this.setState({ show: true, tracking: response.data.data, period: period }, (r) => {
					console.log('periodIndex before', this.state)
					this.isOnAlert(r)
				})
			})
			.catch((error) => {})
	}
	handlePeriodIndex = (e) => {
		// console.log("e", e)
		console.log('periodIndex before', this.state.periodIndex)
		this.setState({ periodIndex: e }, () => {
			console.log('periodIndex after', this.state.periodIndex)
		})
	}

	showModal() {
		console.log('show modal')
		console.log(this.state)
		console.log(this.props)
		this.setState({ showModal: !this.state.showModal })
	}

	handleModalSubmit() {
		console.log('handle submit')
		console.log(this.state)
		console.log(this.props)

		// let obj = {
		// 	id: this.state.tracking['_id'],
		// }
		// planning
		// 	.getPlanning(obj)
		// 	.then((response) => {
		// 		this.setState({ edit: true })
		// 		history.push('/createPlanning', { edit: true, planning: response.data })
		// 	})
		// 	.catch((error) => {
		// 		alert(error)
		// 	})
	}

	isOnAlert(r) {
		if (this.state.isInitial) {
			let newsAlertMargin = this.state.tracking.weekValues[this.state.periodIndex].expectedNews - this.state.tracking.weekValues[this.state.periodIndex].expectedNews * 0.05
			let audienceAlertMargin = this.state.tracking.weekValues[this.state.periodIndex].expectedAudience - this.state.tracking.weekValues[this.state.periodIndex].expectedAudience * 0.05
			let budgetAlertMargin = this.state.tracking.weekValues[this.state.periodIndex].expectedBudget + this.state.tracking.weekValues[this.state.periodIndex].expectedBudget * 0.01

			if (
				this.state.tracking.weekValues[this.state.periodIndex].realNews <= newsAlertMargin ||
				this.state.tracking.weekValues[this.state.periodIndex].realAudience <= audienceAlertMargin ||
				this.state.tracking.weekValues[this.state.periodIndex].realBudget >= budgetAlertMargin
			) {
				this.setState({ showModal: true })
			}
		}
	}

	render() {
		return (
			<div className="main">
				<Sidebar />
				{this.state.show ? (
					<>
						{this.state.showModal && isHead() ? (
							<Modal
								title={'Atualmente o planejamento está longe de ser alcançado'}
								subtitle={'Você gostaria de replanejar?'}
								onRedirect={this.handleModalSubmit.bind(this)}
								onClose={this.showModal.bind(this)}
							/>
						) : (
							<></>
						)}
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
												{isEditor() ? <Button style={{ width: '77px' }} title="Hoje" callback={(e) => this.handlePeriodSelection(e, 'day')}></Button> : <></>}
												<Button style={{ width: '99px' }} title="Semana" callback={(e) => this.handlePeriodSelection(e, 'week')}></Button>
												<Button style={{ width: '165px' }} title="Planejamento Total" callback={(e) => this.handlePeriodSelection(e, 'all')}></Button>
											</div>
										</div>
									</div>
									<div className="cards-tracking">
										<Cards
											order={'asc'}
											title="Matérias"
											realPoints={this.state.tracking.weekValues[this.state.periodIndex].realNews}
											plannedPoints={this.state.tracking.weekValues[this.state.periodIndex].planNews}
											expectedPoints={this.state.tracking.weekValues[this.state.periodIndex].expectedNews}
										/>
										<Cards
											order={'asc'}
											title="Audiência"
											realPoints={this.state.tracking.weekValues[this.state.periodIndex].realAudience}
											plannedPoints={this.state.tracking.weekValues[this.state.periodIndex].planAudience}
											expectedPoints={this.state.tracking.weekValues[this.state.periodIndex].expectedAudience}
										/>
										<Cards
											order={'desc'}
											title="Orçamento"
											realPoints={this.state.tracking.weekValues[this.state.periodIndex].realBudget}
											plannedPoints={this.state.tracking.weekValues[this.state.periodIndex].planBudget}
											expectedPoints={this.state.tracking.weekValues[this.state.periodIndex].expectedBudget}
											// onAlert={this.onAlert.bind(this)}
										/>
									</div>
									<div className="prediction-tracking">
										<PredictionInformation tracking={this.state.tracking} period={this.state.period} onChange={this.handlePeriodIndex.bind(this)} />
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
