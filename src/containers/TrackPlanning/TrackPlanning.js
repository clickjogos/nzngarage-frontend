import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputLabelPlanning from '../../components/InputLabel/InputLabelPlanning'
import Button from '../../components/Button/Button'
import history from '../App/history'
import { Redirect } from 'react-router-dom'
import Cards from '../../components/Cards/Cards'
import PredictionInformation from '../../components/PredictionInformation/PredictionInformation'
import Loading from '../../components/Loading/Loading'

import './TrackPlanning.scss'
// import * as tracking from '../../providers/tracking'

import data from '../../providers/mocks/data.json'
const Backbutton = require('../../assets/icons/icon-back-button.svg')

class TrackPlanning extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: true,
		}
	}

	selectPeriod(e) {
		console.log(e)
	}

	render() {
		// if (this.state.redirect) return <Redirect exact to={{ pathname: '/refinePlanning', state: this.state }} />
		return (
			<div className="main-content">
				<Sidebar />
				{this.state.show ? (
					<>
						<div className="container-flex-tracking">
							<div className="container-block-track">
								<div className="container-tracking">
									<div className="head-tracking">
										<div className="title-tracking">
											<h3 style={{ fontSize: "28px" }}>Visão Geral do Planejamento</h3>
											<h4 style={{ fontSize: "18px" }}>Você pode refinar a sugestão de planejamento</h4>
										</div>
										<div className="filters-tracking">

										</div>
									</div>

									<Cards title="Matérias" realPoints="90" estimedPoints="320"></Cards>
									<PredictionInformation />
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

export default TrackPlanning
