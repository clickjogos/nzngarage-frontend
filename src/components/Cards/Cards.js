import React, { Component } from 'react'
import './Cards.scss'
import Loading from '../../components/Loading/Loading'
import { isHead, isEditor } from '../../providers/authentication'
import Modal from '../../components/Modal/Modal'
import warning from '../../assets/images/warning.svg'

export default class Cards extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: true,
			title: this.props.title,
			order: this.props.order,
			isPast: this.props.isPast
		}
		
	}

	componentDidMount() {
		this.setState(
			{
				realPoints: this.props.realPoints,
				plannedPoints: this.props.plannedPoints,
				expectedPoints: this.props.expectedPoints,
			},
			(e) => {
			
				this.checkConditions(this.props)
				this.verifyAlerts()
			}
		)
	}

	UNSAFE_componentWillReceiveProps(props) {
		this.setState(
			{
				realPoints: props.realPoints,
				plannedPoints: props.plannedPoints,
				expectedPoints: props.expectedPoints,
				isPast: props.isPast
			},
			(e) => {
				this.checkConditions(props)
				this.verifyAlerts()
			}
		)
	}

	checkConditions = (props) => {
		let percentage = parseInt((this.state.realPoints * 100) / this.state.plannedPoints)

	
		if (percentage >= 100) {
			this.setState({ progressBarWidth: { width: '100%' }, show: true }, (e) => { })
		} else {
			this.setState({ progressBarWidth: { width: `${percentage}%` }, show: true }, (e) => {

			})
		}
	}

	verifyAlerts() {

		let marginMarker = parseInt((this.state.expectedPoints * 100) / this.state.plannedPoints)
		if (isHead()) {
			if (marginMarker >= 100) marginMarker = 100
			this.setState({ expectedBarWidth: { 'left': `${marginMarker}%` } }, () => {
				if (this.state.order === 'asc') {
					if (this.state.expectedPoints >= this.state.realPoints) {
						this.setState({ alert: true, spanAlertText: 'Você está abaixo do esperado!' })
					}
				} else if (this.state.order === 'desc') {
					if (this.state.expectedPoints <= this.state.realPoints) {
						this.setState({ alert: true, spanAlertText: 'Você está acima do esperado!' })
					}
				}
			})
		}
	}

	render() {
		return this.state.show ? (
			<div className="card">
				<div className="tracking-header-card">
					<div>
						<h4>{this.state.title}</h4>
						<div className="points">
							<p>{this.state.realPoints}</p> /<p>{this.state.plannedPoints}</p>
						</div>
					</div>
					<div>
						{this.state.alert ? (
							<a>
								<span>{this.state.spanAlertText}</span>{' '}
								<img className="warningColor" src={warning} alt="" />
								{' '}
							</a>

						) : (
								<></>
							)}
					</div>
				</div>
				<div className="progress-information">
					<div className="progressBar">
						<div style={this.state.progressBarWidth} className="percentageItem"></div>
						{(isHead() && !this.state.isPast) ? (<div style={this.state.expectedBarWidth} className="expectedItem">
							<p className="expectedValue">{this.state.expectedPoints}</p>
							<p className="expectedMark">{''}</p></div>) : (<></>)}
					</div>
				</div>
			</div>
		) : (
				<Loading />
			)
	}
}
