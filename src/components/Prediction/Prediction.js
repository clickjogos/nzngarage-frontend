import React, { Component } from 'react'
import './Prediction.scss'
import InputLabelPlanning from '../../components/InputLabel/InputLabelPlanning'
import * as model from '../../providers/model'

export default class Pagination extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: true,
			filter: false,
			inference: this.props.weeksValuesInference,
			// inputsCount: [ {tag: 13}, {weekDay: 7}, {period: 3}, {type: 2 }],
			weekIndex: 0,
		}
		// console.log('mock', this.state.inference)
		console.log('mock', this.props.weeksValuesInference)
	}

	getWeekIndex(e) {
		console.log(e.target.id)
		let direction = e.target.id
		this.setState({ show: false })
		let newIndex
		if (direction == 'back') {
			newIndex = this.state.weekIndex - 1
		} else {
			newIndex = this.state.weekIndex + 1
		}
		console.log(newIndex)
		this.setState({ weekIndex: newIndex, show: true })
	}

	handleChange(key, event) {
		// // event.preventDefault()
		// // console.log("!!! EVENT")
		// console.log("!!! EVENT")
		// console.log("key ", key)
		console.log('event  ', event)

		let indexToUpdate = this.state.inference[this.state.weekIndex].predictions.findIndex((item) => item.key == key)
		// console.log("idx ", indexToUpdate)

		// console.log("BEFORE")
		// console.log(this.state.inference[this.state.weekIndex].predictions[indexToUpdate].normalizedValue)
		if (event == '') event = 0
		event = parseInt(event)
		let previousValue = this.state.inference[this.state.weekIndex].predictions[indexToUpdate].normalizedValue
		let objectToRenormalize = {
			key: key,
			changedValue: event,
			previousValue: previousValue,
			category: this.state.inference[this.state.weekIndex].predictions[indexToUpdate].category,
		}
		this.state.inference[this.state.weekIndex].predictions[indexToUpdate].normalizedValue = event
		this.setState({ inference: this.state.inference })
		this.renormalizeValues(objectToRenormalize)
		// console.log("AFTER")
		// console.log(this.state.inference[this.state.weekIndex].predictions[indexToUpdate].normalizedValue)
		// this.setState({value: event.target.value});
		this.handleFormUpdate(this.state.inference)
	}

	renormalizeValues(payload) {
		let obj = {
			changedInformation: {
				key: payload.key,
				changedValue: payload.changedValue,
				previousValue: payload.previousValue,
				category: payload.category,
			},
			weekValues: this.state.inference[this.state.weekIndex],
		}
		model
			.renormalize(obj)
			.then((response) => {
				this.state.inference[this.state.weekIndex] = response.data[0]
				this.setState({ inference: this.state.inference })
			})
			.catch((error) => {
				alert(error)
			})
	}

	handleFormUpdate() {
		this.props.onChange()
	}

	handleClickLabel(event) {
		// event.preventDefault()
		let status = !this.state.filter.status
		let key = event
		this.setState({ filter: { status: status, key: key } })
		console.log(event)
	}
	render() {
		return (
			<div className="main-pagination">
				<div className="pagination">
					{this.state.weekIndex > 0 ? (
						<button onClick={(e) => this.getWeekIndex(e)} value="back" id="back">
							❮
						</button>
					) : (
						<> </>
					)}
					<h5 style={{ fontStyle: 'normal normal 600 18px/24px Proxima Nova;', fontSize: '18px', color: '#2944D9' }}>
						Semana {this.state.weekIndex + 1} de {this.state.inference.length}
					</h5>
					{this.state.weekIndex < this.state.inference.length - 1 ? (
						<button onClick={(e) => this.getWeekIndex(e)} value="forward" id="forward">
							❯
						</button>
					) : (
						<> </>
					)}
				</div>
				<div className="main-container" style={{ height: '100%' }}>
					{this.state.show ? (
						<>
							{/* <form onChange={ (e) => this.handleChange(e)}> */}
							<form>
								<div className="tag">
									<div className="tag-label">
										<p>Cadernos</p>
									</div>
									<div className="tag-content">
										{this.state.inference[this.state.weekIndex].predictions
											.filter((pred) => pred.category == 'tag')
											.map((filtered) => (
												<>
													{this.state.filter.status ? (
														<>
															{filtered.key == this.state.filter.key ? (
																<InputLabelPlanning
																	filter={{active:true}}
																	onclick={(e) => this.handleClickLabel(e)}
																	callback={(e) => this.handleChange(filtered.key, e)}
																	label={filtered.key}
																	value={filtered.normalizedValue}
																/>
															) : (
																<InputLabelPlanning
																filter={{active:false}}
																	onclick={(e) => this.handleClickLabel(e)}
																	callback={(e) => this.handleChange(filtered.key, e)}
																	label={filtered.key}
																	value={filtered.normalizedValue}
																/>
															)}
														</>
													) : (
														<InputLabelPlanning
															onclick={(e) => this.handleClickLabel(e)}
															callback={(e) => this.handleChange(filtered.key, e)}
															label={filtered.key}
															value={filtered.normalizedValue}
														/>
													)}
												</>
											))}
									</div>
								</div>
								<div className="others">
									<div>
										<p>Dias da semana</p>
										{this.state.inference[this.state.weekIndex].predictions
											.filter((pred) => pred.category == 'weekDay')
											.map((filtered) => (
												<InputLabelPlanning callback={(e) => this.handleChange(filtered.key, e)} label={filtered.key} value={filtered.normalizedValue} />
											))}
									</div>
									<div>
										<div>
											<p>Período</p>
											{this.state.inference[this.state.weekIndex].predictions
												.filter((pred) => pred.category == 'dayPeriod')
												.map((filtered) => (
													<InputLabelPlanning callback={(e) => this.handleChange(filtered.key, e)} label={filtered.key} value={filtered.normalizedValue} />
												))}
										</div>
										<div>
											<p>Tipo</p>
											{this.state.inference[this.state.weekIndex].predictions
												.filter((pred) => pred.category == 'type')
												.map((filtered) => (
													<InputLabelPlanning callback={(e) => this.handleChange(filtered.key, e)} label={filtered.key} value={filtered.normalizedValue} />
												))}
										</div>
									</div>
								</div>
							</form>
						</>
					) : (
						<h1> Carregando... </h1>
					)}
				</div>
			</div>
		)
	}
}
