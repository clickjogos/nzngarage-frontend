import React, { Component } from 'react'
import './Prediction.scss'
import InputLabelPlanning from '../../components/InputLabel/InputLabelPlanning'
import InputLabelRefine from '../../components/InputLabel/InputLabelRefine'
import * as model from '../../providers/model'
import Loading from '../../components/Loading/Loading'

export default class Prediction extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: true,
			filter: false,
			inference: this.props.weeksValuesInference,
			weekIndex: 0,
		}
	}

	getWeekIndex(e) {

		let direction = e.target.id
		this.setState({ show: false })
		let newIndex
		if (direction === 'back') {
			newIndex = this.state.weekIndex - 1
		} else {
			newIndex = this.state.weekIndex + 1
		}
		this.setState({ weekIndex: newIndex, show: true })
	}

	handleChange(key, event) {
		if (event === '') event = 0
		event = parseInt(event)

		let indexToUpdate = this.state.inference[this.state.weekIndex].predictions.findIndex((item) => item.key === key)
		let previousValue = this.state.inference[this.state.weekIndex].predictions[indexToUpdate].normalizedValue

		this.state.inference[this.state.weekIndex].predictions[indexToUpdate].normalizedValue = event

		if (previousValue < event) {
			var differenceQuantityNews = Math.abs(previousValue - event)
		}
		else {
			var differenceQuantityNews = event - previousValue
		}

		this.state.inference.map((week, indexWeek) => {
			if (indexWeek === this.state.weekIndex) {
				this.state.inference[indexWeek].totalWeekNews = this.state.inference[indexWeek].totalWeekNews + differenceQuantityNews
			} else {
				this.state.inference[indexWeek].totalQuantityNews = this.state.inference[indexWeek].totalQuantityNews + differenceQuantityNews
			}
		})
		let objectToRenormalize = {
			key: key,
			changedValue: event,
			previousValue: previousValue,
			category: this.state.inference[this.state.weekIndex].predictions[indexToUpdate].category,
		}
		this.renormalizeValues(objectToRenormalize)
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
				this.handleFormUpdate(this.state.inference)
			})
			.catch((error) => {
				alert(error)
			})
	}

	handleFormUpdate() {
		this.props.onChange()
	}

	handleClickLabel(event) {
		let status = !this.state.filter.status
		let key = event
		let indexToGet = this.state.inference[this.state.weekIndex].predictions.findIndex((item) => item.key === key)

		this.setState({
			filter: {
				status: status,
				key: key,
				relations: this.state.inference[this.state.weekIndex].predictions[indexToGet].relations,
			},
		})
	}
	render() {
		return (
			<div className="main-pagination">
				<div className="pagination">

					{this.state.weekIndex <= 0 ? (
						<button disabled value="back" id="back">❮</button>
					) : (<button onClick={(e) => this.getWeekIndex(e)} value="back" id="back">
						❮
					</button>)}
					<h5 style={{ fontStyle: 'normal normal 600 18px/24px Proxima Nova;', fontSize: '18px', color: '#2944D9' }}>
						Semana {this.state.weekIndex + 1} de {this.state.inference.length}
					</h5>
					{this.state.weekIndex >= this.state.inference.length - 1 ? (
						<button disabled value="forward" id="forward">❯</button>
					) : (<button onClick={(e) => this.getWeekIndex(e)} value="forward" id="forward">
						❯
					</button>)}
				</div>
				<div className="main-container" style={{ height: '100%' }}>
					{this.state.show ? (
						<>
							<form>
								<div className="tag">
									<div className="tag-label">
										<p>Cadernos</p>
									</div>
									<div className="tag-content">
										{this.state.inference[this.state.weekIndex].predictions
											.filter((pred) => pred.category === 'tag')
											.map((filtered) => (
												<>
													{this.state.filter.status ? (
														<>
															{filtered.key === this.state.filter.key ? (
																<InputLabelRefine
																	filter={{ active: true }}
																	onclick={(e) => this.handleClickLabel(e)}
																	callback={(e) => this.handleChange(filtered.key, e)}
																	label={filtered.key}
																	value={filtered.normalizedValue}
																/>
															) : (
																	<InputLabelRefine
																		filter={{ disabled: true }}
																		onclick={(e) => this.handleClickLabel(e)}
																		callback={(e) => this.handleChange(filtered.key, e)}
																		label={filtered.key}
																		value={filtered.normalizedValue}
																	/>
																)}
														</>
													) : (
															<InputLabelRefine
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

										{this.state.filter.status
											? this.state.filter.relations
												.filter((pred) => pred.category === 'weekDay')
												.map((insideFilter) => (
													<InputLabelRefine filter={{ readOnly: true }} label={insideFilter.key} value={insideFilter.value} />
												))
											: this.state.inference[this.state.weekIndex].predictions
												.filter((pred) => pred.category === 'weekDay')
												.map((filtered) => <InputLabelRefine onclick={(e) => { }} callback={(e) => this.handleChange(filtered.key, e)} label={filtered.key} value={filtered.normalizedValue} />)}
									</div>
									<div>
										<div>
											<p>Período</p>
											{this.state.filter.status
												? this.state.filter.relations
													.filter((pred) => pred.category === 'dayPeriod')
													.map((insideFilter) => <InputLabelRefine filter={{ readOnly: true }} label={insideFilter.key} value={insideFilter.value} />)
												: this.state.inference[this.state.weekIndex].predictions
													.filter((pred) => pred.category === 'dayPeriod')
													.map((filtered) => <InputLabelRefine onclick={(e) => { }} callback={(e) => this.handleChange(filtered.key, e)} label={filtered.key} value={filtered.normalizedValue} />)}
										</div>
										<div>
											<p>Tipo</p>
											{this.state.filter.status
												? this.state.filter.relations
													.filter((pred) => pred.category === 'type')
													.map((insideFilter) => <InputLabelRefine filter={{ readOnly: true }} label={insideFilter.key} value={insideFilter.value} />)
												: this.state.inference[this.state.weekIndex].predictions
													.filter((pred) => pred.category === 'type')
													.map((filtered) => <InputLabelRefine onclick={(e) => { }} callback={(e) => this.handleChange(filtered.key, e)} label={filtered.key} value={filtered.normalizedValue} />)}
										</div>
									</div>
								</div>
							</form>
						</>
					) : (
							<Loading />
						)}
				</div>
			</div>
		)
	}
}
