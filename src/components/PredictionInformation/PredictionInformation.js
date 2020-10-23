import React, { Component } from 'react'

import './PredictionInformation.scss'
import { formatTrackingDayFilter } from '../../utils/format'
export default class PredictionInformation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false,
			tracking: this.props.tracking,
			period: this.props.period,
			periodIndex: 0,
		}

		console.log(">>> state do predic")
		console.log(this.state)
	}

	getPeriodIndex(e) {
		let direction = e.target.id
		this.setState({ show: false })
		let newIndex
		if (direction === 'back') {
			newIndex = this.state.periodIndex - 1
		} else {
			newIndex = this.state.periodIndex + 1
		}
		this.setState({ periodIndex: newIndex, show: true }, () => {
			this.handlePeriodIndex(this.state.periodIndex)
		})
	}

	handlePeriodIndex(e) {
		this.props.onChange(e)
	}

	defineFilterHeader() {
		if (this.state.period === 'day') {
			return formatTrackingDayFilter(this.state.tracking.weekValues[this.state.periodIndex].date)
		} else if (this.state.period === 'week') {
			return `Semana ${this.state.periodIndex + 1} de ${this.state.tracking.weekValues.length} `
		} else {
			return 'Planejamento Total'
		}
	}

	render() {
		return (
			<div>
				<div className="pagination">
					{/* {this.state.periodIndex > 0 ? (
						<button onClick={(e) => this.getPeriodIndex(e)} value="back" id="back">
							❮
						</button>
					) : (
							<> </>
						)}
					<h5>{this.defineFilterHeader()}</h5>
					{this.state.periodIndex < this.state.tracking.weekValues.length - 1 ? (
						<button onClick={(e) => this.getPeriodIndex(e)} value="forward" id="forward">
							❯
						</button>
					) : (
							<> </>
						)} */}

					{this.state.periodIndex <= 0 ? (
						<button disabled value="back" id="back">❮</button>
					) : (<button onClick={(e) => this.getPeriodIndex(e)} value="back" id="back">
						❮
					</button>)}
					<h5>
						{this.defineFilterHeader()}
					</h5>
					{this.state.periodIndex >= this.state.tracking.weekValues.length - 1 ? (
						<button disabled value="forward" id="forward">❯</button>
					) : (<button onClick={(e) => this.getPeriodIndex(e)} value="forward" id="forward">
						❯
					</button>)}
				</div>
				<div className="prediction-information-container">
					<div className="only-tag-content">
						<div>
							<label>Cadernos</label>
						</div>

						{this.state.tracking.weekValues[this.state.periodIndex].reality
							.filter((pred) => pred.category === 'tag')
							.map((filtered, index) => (
								<>
									<li>
										{filtered.key} - {filtered.realValue}/{filtered.value}
									</li>
								</>
							))}
					</div>
					<div className="others-categories-content">
						<div>
							<div>
								<div>
									<label>Período</label>
								</div>
								{this.state.tracking.weekValues[this.state.periodIndex].reality
									.filter((pred) => pred.category === 'dayPeriod')
									.map((filtered) => (
										<>
											<p>
												{filtered.key} - {filtered.realValue}/{filtered.value}
											</p>
										</>
									))}
							</div>
							<div>
								<div>
									<label>Tipo</label>
								</div>
								{this.state.tracking.weekValues[this.state.periodIndex].reality
									.filter((pred) => pred.category === 'type')
									.map((filtered) => (
										<>
											<p>
												{filtered.key} - {filtered.realValue}/{filtered.value}
											</p>
										</>
									))}
							</div>
						</div>
						{this.state.period !== 'day' ? (
							<div>
								<div>
									<div>
										<label>Essa semana</label>
									</div>

									{this.state.tracking.weekValues[this.state.periodIndex].reality
										.filter((pred) => pred.category === 'weekDay')
										.map((filtered) => (
											<>
												<p>
													{filtered.key} - {filtered.realValue}/{filtered.value}
												</p>
											</>
										))}
								</div>
							</div>
						) : (
								<></>
							)}
					</div>
				</div>
			</div>
		)
	}
}
