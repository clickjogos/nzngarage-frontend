import React, { Component } from 'react'
import './Cards.scss'
import Loading from '../../components/Loading/Loading'
import { isHead, isEditor } from '../../providers/authentication'

export default class Cards extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: true,
			title: this.props.title,
			order: this.props.order,
			// realPoints: this.props.realPoints,
			// estimedPoints: this.props.estimedPoints,
			// expectedPoints: this.props.expectedPoint,
			// progressBarWidth: this.props.points.progressBarWidth
		}
		console.log(this.state.title)
		// this.checkConditions(this.props)
	}

	componentDidMount() {
		console.log('did mount')
		console.log(this.props)

		this.setState(
			{
				realPoints: this.props.realPoints,
				estimedPoints: this.props.estimedPoints,
				expectedPoints: this.props.expectedPoints,
			},
			(e) => {
				// console.log('estadoooooo')
				// console.log(this.state)
				// console.log(e)
				this.checkConditions(this.props)
				this.verifyAlerts()
			}
		)
	}

	UNSAFE_componentWillReceiveProps(props) {
		console.log('veioaqui tbm')
		console.log(props)
		this.setState(
			{
				realPoints: props.realPoints,
				estimedPoints: props.estimedPoints,
				expectedPoints: props.expectedPoints,
			},
			(e) => {
				// console.log('estadoooooo')
				// console.log(this.state)
				// console.log(e)
				this.checkConditions(props)
				this.verifyAlerts()
			}
		)
	}

	checkConditions = (props) => {
		// console.log('check conditions')
		// console.log(props)
		// console.log(this.state)
		// console.log(this.state.realPoints, this.state.estimedPoints)
		let percentage = parseInt((this.state.realPoints * 100) / this.state.estimedPoints)
		// console.log('percentage', percentage)
		if (percentage >= 100) {
			this.setState({ progressBarWidth: { width: '100%' }, show: true }, (e) => {
				// console.log('>>>maior que 100')
				// console.log(`${this.props.title}`, 'progressBarWidth', this.state.progressBarWidth)
			})
		} else {
			this.setState({ progressBarWidth: { width: `${percentage}%` }, show: true }, (e) => {
				// console.log('>>>menor que 100')
				// console.log(`${this.props.title}`, 'progressBarWidth', this.state.progressBarWidth)
			})
		}
	}

	verifyAlerts() {
		if (isHead()) {
			console.log('lets verify alerts')
			if (this.state.order === 'asc') {
				console.log('it is asc')
				if (this.state.expectedPoints >= this.state.realPoints) {
					this.setState({ alert: true })
				}
			} else if (this.state.order === 'desc') {
				console.log('it is desc')
				if (this.state.expectedPoints <= this.state.realPoints) {
					this.setState({ alert: true })
				}
			}
		}
	}

	render() {
		return (
			this.state.show ? (
				<div className="card">

					<div className="tracking-header-card">
						<div >
							<h4>{this.state.title}</h4>
							<div className="points">
								<p>{this.state.realPoints}</p> /<p>{this.state.estimedPoints}</p>
							</div>
						</div>
						<div>{this.state.alert ? <a> !!! <span>Você está abaixo do esperado!</span> </a> : <></>}</div>
					</div>
					<div className="progress-information">
						<div className="progressBar">
							<div style={this.state.progressBarWidth} className="percentageItem"></div>
						</div>
					</div>

				</div>
			) : (
					<Loading />
				)
		)
	}
}
