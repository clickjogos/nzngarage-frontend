import React, { Component } from 'react'
import './Sidebar.scss'
import Image from 'react-bootstrap/Image'
import history from '../../containers/App/history'
import LogoNZN from '../../assets/images/logo-nzn.svg'
import { isHead } from '../../providers/authentication'
import Exit from '../../assets/icons/logout.svg'

const planning = require('../../assets/icons/icon-planejamento.svg')
const acompanhamento = require('../../assets/icons/icon-acompanhamento.svg')

export default class Sidebar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: JSON.parse(localStorage.getItem('user')).user,
			profile: JSON.parse(localStorage.getItem('user')).role,
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

	logout = () => {
		localStorage.clear()
		history.push({
			pathname: '/'
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
							<p id="txtButtonPlan">Planejamentos</p>
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
					<hr />
					<div className="footer-minor">
						<div className="information-person">
							<p>{this.state.username}</p>
						</div>
						<div>
							<img src={Exit} onClick={() => this.logout()} width="20px" height="20px" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}
