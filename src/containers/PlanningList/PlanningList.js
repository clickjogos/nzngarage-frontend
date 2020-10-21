import React, { Component } from 'react'
import './PlanningList.scss'
import PlanningButton from '../../assets/images/new-planning-button.svg'
import Activated from '../../assets/images/icon-active.svg'
import Deactivated from '../../assets/images/icon-desactive.svg'
import Sidebar from '../../components/Sidebar/Sidebar'
import Loading from '../../components/Loading/Loading'
import MoreOptions from '../../assets/images/icon-more-options.svg'
import history from '../App/history'
import * as format from '../../utils/format'
import * as planning from '../../providers/planning'
import * as data from '../../providers/mocks/data.json'

import { findAllInRenderedTree } from 'react-dom/test-utils'

export default class PlanningList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false,
			edit: false,
			showSelect: false,
		}
		console.log('>>> props')
		console.log(this.props)
		console.log('>>> state')
		console.log(this.state)
		console.log(data, 'JSON')
	}

	getEvent = (e, params) => {

		this.setState({ show: false })
		let obj = {
			id: params['_id'],
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

	componentDidMount() {
		this.allRequest()
	}

	async allRequest() {
		try {
			const planningList = await planning.listPlannings()

			this.setState({
				planningList: planningList.data.data,
				show: true,
				edit: true,
			})
		} catch (error) { }
	}

	formatDate(date) {
		return <>{format.reformatDate(date)} </>
	}

	handleSelectSubmit(select, key) {
		if (select.target.value === 'activate') {
			this.activatePlanning(key)
		} else if (select.target.value === 'delete') {
			this.deletePlanning(key)
		}
	}

	deletePlanning(planningId) {
		this.setState({ show: false })
		let obj = { _id: planningId }
		planning
			.deletePlanning(obj)
			.then(() => {
				this.allRequest()
			})
			.catch((error) => { })
	}

	activatePlanning(planningId) {
		this.setState({ show: false })
		let obj = { _id: planningId }
		planning
			.activatePlanning(obj)
			.then(() => {
				this.allRequest()
			})
			.catch((error) => { })
	}


	render() {
		return (
			<div className="main">
				<Sidebar />
				{this.state.show ? (
					<>
						<div className="content-planning">
							<div className="title-planning">
								<h1 className="main-title">Planejamentos</h1>
								<span className="planning-count"> {this.state.planningList.length} </span>
							</div>
							<div className="content-new-planning">
								<div className="new-planning">
									<button className="container-image" onClick={() => history.push('/createPlanning')}>
										<img src={PlanningButton} />
									</button>
									<h2 className="planning-title">Criar novo planejamento</h2>
								</div>
							</div>
							
							<div className="content-theme-list">
								<div className="theme-list">
									<ul>
										{this.state.planningList.map((planning) => {
											if (planning.status) {
												return (
													<li onClick={(e) => this.getEvent(e, planning)} key={planning['_id']} className="theme-list-activated">
														<span className="dates">
															{this.formatDate(planning.startDate)} até {this.formatDate(planning.endDate)}
														</span>
														<h2 className="card-name">{planning.planningName}</h2>
														<div className="status-option">
															<div className="status">
																<img src={Activated} alt="status image" />
																<span>Ativado</span>
															</div>
														</div>
													</li>
												)
											} else {
												return (
													<li key={planning['_id']} className="theme-list-deactivated" >
														<span className="dates">
															{this.formatDate(planning.startDate)} até {this.formatDate(planning.endDate)}
														</span>
														<h2 className="card-name" onClick={(e) => this.getEvent(e, planning)}>{planning.planningName}</h2>
														<div className="status-option" >
															<div className="status">
																<img src={Deactivated} alt="status image" />
																<span>Desativado</span>
															</div>
															<div className="option">
																<img onClick={() => this.setState({ showSelect: !this.state.showSelect, showSelectKey: planning['_id'] })} src={MoreOptions} alt="e" />
																{this.state.showSelect && planning['_id'] === this.state.showSelectKey ? (
																	<select className="select" name="select">
																		<option onClick={(e) => this.handleSelectSubmit(e, planning['_id'])} value="activate" selected>
																			Ativar
																</option>
																		<option onClick={(e) => this.handleSelectSubmit(e, planning['_id'])} value="delete">
																			Apagar
																</option>
																	</select>
																) : (
																		<></>
																	)}
															</div>
														</div>
													</li>
												)
											}
										})}
									</ul>
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
