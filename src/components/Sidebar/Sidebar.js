import React, { Component } from 'react'
import './Sidebar.scss'
import Image from 'react-bootstrap/Image'
import history from '../../containers/App/history'
import LogoNZN from '../../assets/images/logo-nzn.svg'
import { isHead } from '../../providers/authentication'
import Exit from '../../assets/icons/logout.svg'

const planning = require('../../assets/icons/icon-planejamento.svg')
const acompanhamento = require('../../assets/icons/icon-acompanhamento.svg')
const concorrente = require('../../assets/icons/icon-competitor.svg')
const sugestao = require('../../assets/icons/icon-sugestion.svg')
const audiencia = require ('../../assets/icons/icon-analytics.svg')

export default class Sidebar extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: JSON.parse(localStorage.getItem('user')).user,
			profile: JSON.parse(localStorage.getItem('user')).role,
		}
	}

	redirectPage = (pathname) => {
		if(pathname === '/') localStorage.clear()
		history.push({
			pathname,
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
						<button className="buttonSidebar" onClick={() => this.redirectPage('/createPlanning')}>
							<img id="imgIcon" src={planning} height="16px" width="14px" />
							<p id="txtButtonPlan">Planejamentos</p>
						</button>
					</div>) : (<></>)}

					<div>
						<p id="txtplan">AVALIAR</p>
						<button className="buttonSidebar" onClick={() => this.redirectPage('/tracking')}>
							<img id="imgIcon" src={acompanhamento} height="16px" width="14px" />
							<p id="txtButtonGuide">Acompanhamento</p>
						</button>
						<button className="buttonSidebar" onClick={() => this.redirectPage('/competitors')}>
							<img id="imgIcon" src={concorrente} height="16px" width="14px" />
							<p id="txtButtonGuide">Concorrentes</p>
						</button>
						<button className="buttonSidebar" onClick={() => this.redirectPage('/suggestion')}>
							<img id="imgIcon" src={sugestao} height="16px" width="14px" />
							<p id="txtButtonGuide">Sugestão de produção</p>
						</button>
						<button className="buttonSidebar" onClick={() => this.redirectPage('/audience')}>
							<img id="imgIcon" src={audiencia} height="16px" width="14px" />
							<p id="txtButtonGuide">Verificar audiência</p>
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
							<img src={Exit} onClick={() => this.redirectPage('/')} width="20px" height="20px" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}
