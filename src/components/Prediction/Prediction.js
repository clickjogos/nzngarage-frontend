import React, { Component } from 'react'
import './Prediction.scss'
import InputLabelPlanning from '../../components/InputLabel/InputLabelPlanning'

export default class Pagination extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: true,
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

	handleChange(event) {
		console.log({ value: event.target.value })
		// this.setState({value: event.target.value});
	}

	handleSubmit(e) {
		console.log(e)
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
				<div className="main-container" style={{height:"100%"}}>
					{this.state.show ? (
						<>
							<form onSubmit={this.handleSubmit}>
								<div className="tag">
									<div className="tag-label">
										<p>Cadernos</p>
									</div>
									<div className="tag-content">
										{this.state.inference[this.state.weekIndex].predictions
											.filter((pred) => pred.category == 'tag')
											.map((filtered) => (
												<InputLabelPlanning onChange={this.handleChange} label={filtered.key} value={filtered.normalizedValue} />
												// <input onChange={this.handleChange} label={filtered.key} />
											))}
									</div>
								</div>
								<div className="others">
									<div>
										<p>Dias da semana</p>
										{this.state.inference[this.state.weekIndex].predictions
											.filter((pred) => pred.category == 'weekDay')
											.map((filtered) => (
												<InputLabelPlanning callback={(e) => this.setState({ [filtered.key]: e })} label={filtered.key} value={filtered.normalizedValue} />
											))}
									</div>
									<div>
										<div>
											<p>Período</p>
											{this.state.inference[this.state.weekIndex].predictions
												.filter((pred) => pred.category == 'dayPeriod')
												.map((filtered) => (
													<InputLabelPlanning
														// callback={(e) => this.setState({ Seg: e })}
														label={filtered.key}
														value={filtered.normalizedValue}
													/>
												))}
										</div>
										<div>
											<p>Tipo</p>
											{this.state.inference[this.state.weekIndex].predictions
												.filter((pred) => pred.category == 'type')
												.map((filtered) => (
													<InputLabelPlanning
														// callback={(e) => this.setState({ Seg: e })}
														label={filtered.key}
														value={filtered.normalizedValue}
													/>
												))}
										</div>
									</div>
								</div>
							</form>
						</>
					) : (
						<h1> Carregando... </h1>
					)}

					{/* <label>{this.props.label}</label>
                    <input value={this.props.value} /> */}
					{/* <InputLabelPlanning callback={(e) => this.setState({ planningName: e })} label="Nome do Planejamento" placeholder="Nome do Planejamento" /> */}
					{/* <InputLabel label="E-mail" placeholder="exemplo@email.com.br" /> */}
				</div>
			</div>
		)   
	}
}
