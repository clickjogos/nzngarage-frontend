import React, { Component } from 'react'
import Loading from '../../components/Loading/Loading'
import Sidebar from '../../components/Sidebar/Sidebar'
import Cards from '../../components/Cards/Cards'
import Button from '../../components/Button/Button'
import PredictionInformation from '../../components/PredictionInformation/PredictionInformation'

import './TrackingPlanning.scss'

import * as tracking from '../../providers/tracking'
class TrackingPlanning extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false,
			period: 'day'
		}
	}

	componentDidMount() {
		this.getTrackingByPeriod('day')
	}
	getTrackingByPeriod(period) {
		tracking
			.trackingByPeriod({ period: period })
			.then((response) => {
				this.setState({ show: true, tracking: response.data.data })
				console.log('>>>>Tracking')
				console.log(this.state.tracking)
				let realPoints1 = this.state.tracking.weekValues[0].realNews
				let estimedPoint1 = this.state.tracking.weekValues[0].news
				let realPoints2 = this.state.tracking.weekValues[0].realAudience
				let estimedPoints2 = this.state.tracking.weekValues[0].audience
				let realPoints3 = this.state.tracking.weekValues[0].realBudget
                let estimedPoints3 = this.state.tracking.weekValues[0].budget
                console.log("N E W S rea/extimate")
                console.log(realPoints1, estimedPoint1)
                console.log("A U D I E N C E rea/extimate")
                console.log(realPoints2, estimedPoints2)
                console.log("B U D G E T rea/extimate")
                console.log(realPoints3, estimedPoints3)
			})
			.catch((error) => {})
	}
	handlePeriodSelection = (e, period) => {
		this.setState({ show: false, period: period })
		this.getTrackingByPeriod(period)
	}


	render() {
		return (
			<div className="main">
				<Sidebar />
				{this.state.show ? (
					<>
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
											<Button style={{width: '77px'}}title="Hoje" callback={(e) => this.handlePeriodSelection(e, 'day')}></Button>
											<Button style={{width: '99px'}}title="Semana" callback={(e) => this.handlePeriodSelection(e, 'week')}></Button>
											<Button style={{width: '165px'}} title="Planejamento Total" callback={(e) => this.handlePeriodSelection(e, 'all')}></Button>

                                            </div>
										</div>
									</div>
                                    <div className="cards-tracking">
                                        <Cards title="Matérias" realPoints={this.state.tracking.weekValues[0].realNews} estimedPoints={this.state.tracking.weekValues[0].planNews} />
                                        <Cards title="Audiência" realPoints={this.state.tracking.weekValues[0].realAudience} estimedPoints={this.state.tracking.weekValues[0].planAudience} />
                                        <Cards title="Orçamento" realPoints={this.state.tracking.weekValues[0].realBudget} estimedPoints={this.state.tracking.weekValues[0].planBudget} />

                                    </div>
									<div className="prediction-tracking">
										<PredictionInformation
											tracking={this.state.tracking}
											period={this.state.period}
										/>
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
