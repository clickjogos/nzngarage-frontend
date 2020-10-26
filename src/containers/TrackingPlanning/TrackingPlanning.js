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
		this.setState({ show: false, period: period })
		this.getTrackingByPeriod(period)
	}

	getTrackingByPeriod(period) {
		console.log(period)
		tracking
			.trackingByPeriod({ period: period })
			.then((response) => {
				this.setState({ tracking: response.data.data, period: period }, (r) => {
					console.log('periodIndex before', this.state)
					let isPast = this.checkIfIsPastDate(null)
					if (!isPast)
						this.isOnAlert(r)
				})
			})
			.catch((error) => { })
	}

	checkIfIsPastDate(indexToCompare) {
		let indexActualDate = this.state.tracking.weekValues.findIndex((item) => item.actual === true)
		console.log("indexToCompare", indexToCompare, "indexActualDate", indexActualDate)
		if (indexToCompare !== null) {
			if (indexActualDate === -1) {
				console.log("caso 1")
				this.setState({ isPast: true, show: true })
				return true
			}
			else if (indexToCompare < indexActualDate) {
				console.log("caso 2")
				this.setState({ isPast: true, show: true })
				return true
			} else {
				console.log("caso 3")
				this.setState({ isPast: false, show: true })
				return false
			}
		} else {
			if (indexActualDate === -1) {
				console.log("caso 4")
				this.setState({ isPast: true, show: true, periodIndex: 0 })
				return true
			} else {
				console.log("caso 5")
				this.setState({ isPast: false, periodIndex: indexActualDate, show: true })
				return false
			}
		}
	}

	handlePeriodIndex = (e) => {
		this.checkIfIsPastDate(e)
		this.setState({ periodIndex: e }, () => {
		})
	}

	showModal() {
		this.setState({ showModal: !this.state.showModal })
	}

	handleModalSubmit() {
		console.log('handle submit')
		console.log(this.state)
		console.log(this.props)

		let obj = {
			id: this.state.tracking['_id'],
		}
		planning
			.getPlanning(obj)
			.then((response) => {
				this.setState({ edit: true })
				history.push('/createPlanning', { edit: true, planning: response.data })
			})
			.catch((error) => {
				alert(error)
			})
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
											<h2 style={{ fontSize: '28px' }}>Visão Geral do Planejamento</h2>
											<h4 style={{ fontSize: '18px', color: "#636F7A" }}>Você pode refinar a sugestão de planejamento</h4>
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
											isPast={this.state.isPast}
											realPoints={this.state.tracking.weekValues[this.state.periodIndex].realNews}
											plannedPoints={this.state.tracking.weekValues[this.state.periodIndex].planNews}
											expectedPoints={this.state.tracking.weekValues[this.state.periodIndex].expectedNews}
										/>
										<Cards
											order={'asc'}
											title="Audiência"
											isPast={this.state.isPast}
											realPoints={this.state.tracking.weekValues[this.state.periodIndex].realAudience}
											plannedPoints={this.state.tracking.weekValues[this.state.periodIndex].planAudience}
											expectedPoints={this.state.tracking.weekValues[this.state.periodIndex].expectedAudience}
										/>
										<Cards
											order={'desc'}
											title="Orçamento"
											isPast={this.state.isPast}
											realPoints={this.state.tracking.weekValues[this.state.periodIndex].realBudget}
											plannedPoints={this.state.tracking.weekValues[this.state.periodIndex].planBudget}
											expectedPoints={this.state.tracking.weekValues[this.state.periodIndex].expectedBudget}
										// onAlert={this.onAlert.bind(this)}
										/>
									</div>
									<div className="prediction-tracking">
										<PredictionInformation periodIndex={this.state.periodIndex} tracking={this.state.tracking} period={this.state.period} onChange={this.handlePeriodIndex.bind(this)} />
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
