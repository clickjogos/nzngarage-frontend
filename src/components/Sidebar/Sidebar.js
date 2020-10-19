import React, { Component } from 'react'
import './Sidebar.scss'
import Image from 'react-bootstrap/Image'
import history from '../../containers/App/history'
import LogoNZN from '../../assets/images/nzn.png'
import { isHead } from '../../providers/authentication'

const planning = require('../../assets/icons/icon-planejamento.svg')
const acompanhamento = require('../../assets/icons/icon-acompanhamento.svg')

export default class Sidebar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: JSON.parse(localStorage.getItem('user')).name,
			profile: JSON.parse(localStorage.getItem('user')).profile,
		}
	}

	redirectPagePlanning = () => {
		history.push({
			pathname: '/createPlanning',
		})
	}

	redirectPageList = () => {
		history.push({
			pathname: '/tracking',
		})
	}

	render() {
		return (
			<div className="sidebar">
				<div className="logo">
					<img src={LogoNZN} height="44px" width="173px" />
				</div>
				<hr />
				<div className="icon-container">
					{isHead() ? (<div>
						<p id="txtplan">CRIAR</p>
						<button className="buttonSidebar" onClick={() => this.redirectPagePlanning()}>
							<img id="imgIcon" src={planning} height="16px" width="14px" />
							<p id="txtButtonPlan">Planejamento</p>
						</button>
					</div>) : (<></>)}

					<div>
						<p id="txtplan">AVALIAR</p>
						<button className="buttonSidebar" onClick={() => this.redirectPageList()}>
							<img id="imgIcon" src={acompanhamento} height="16px" width="14px" />
							<p id="txtButtonGuide">Acompanhamento</p>
						</button>
					</div>
				</div>
				<div id="footer">
					<div className="information-person">
						<p>{this.state.username}</p>
					</div>
				</div>
			</div>
		)
	}
}
