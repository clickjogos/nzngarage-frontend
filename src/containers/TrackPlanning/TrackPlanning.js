import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputLabelPlanning from '../../components/InputLabel/InputLabelPlanning'
import Button from '../../components/Button/Button'
import history from '../App/history'
import { Redirect } from 'react-router-dom'

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
			<div className="main">
				<Sidebar />
				{this.state.show ? (
					<>

					</>
				) : (
						<h1> Carregando... </h1>
					)}
			</div>
		)
	}
}

export default TrackPlanning
