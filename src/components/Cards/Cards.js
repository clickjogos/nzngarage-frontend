import React, { Component } from 'react'
import './Cards.scss'
import Loading from '../../components/Loading/Loading'
import { isHead, isEditor } from '../../providers/authentication'
import Modal from '../../components/Modal/Modal'
export default class Cards extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: true,
			title: this.props.title,
			order: this.props.order
		}
		console.log(this.state.title)
	}

	componentDidMount() {
		// console.log('did mount')
		// console.log(this.props)

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
		// console.log('veioaqui tbm')
		// console.log(props)
		this.setState(
			{
				realPoints: props.realPoints,
				plannedPoints: props.plannedPoints,
				expectedPoints: props.expectedPoints,
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
		// console.log("x da questao")
		let marginMarker = parseInt((this.state.expectedPoints * 100) / this.state.plannedPoints)
		if (isHead()) {
			// console.log('lets verify alerts')
			// console.log(marginMarker)
			if (marginMarker >= 100) marginMarker = 100
			// console.log(marginMarker)
			this.setState({ expectedBarWidth: { 'left': `${marginMarker}%` } }, () => {
				// console.log("leeeeft",this.state.expectedBarWidth)
				if (this.state.order === 'asc') {
					// console.log('it is asc')
					if (this.state.expectedPoints >= this.state.realPoints) {
						this.setState({ alert: true, spanAlertText: 'Você está abaixo do esperado!' })
						// this.props.onAlert()
					}
				} else if (this.state.order === 'desc') {
					// console.log('it is desc')
					if (this.state.expectedPoints <= this.state.realPoints) {
						this.setState({ alert: true, spanAlertText: 'Você está acima do esperado!' })
						// this.props.onAlert
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
								{' '}
								!!! <span>{this.state.spanAlertText}</span>{' '}
							</a>

						) : (
								<></>
							)}
					</div>
				</div>
				<div className="progress-information">
					<div className="progressBar">
						<div style={this.state.progressBarWidth} className="percentageItem"></div>
						{isHead() ? (<div style={this.state.expectedBarWidth} className="expectedItem">
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
