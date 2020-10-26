import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import InputLabel from '../../components/InputLabel/InputLabel'
import Loading from '../../components/Loading/Loading'
import Button from '../../components/Button/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import backgroundLogin from '../../assets/images/brand-illustration.png'
import history from '../App/history'
import * as authentication from '../../providers/authentication'
import { isHead } from '../../providers/authentication'
import '../Login/Login.scss'
import { Input } from 'reactstrap'
// const logoNZN = require('../../assets/images/nzn.png')
const logoNZN = require('../../assets/images/logo-nzn.svg')

class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: true,
			email: '',
			password: '',
		}
	}

	redirectPage = () => {
		let profile = isHead()
		if (isHead()) {
			history.push({
				pathname: '/createPlanning'
			})
		} else {
			history.push({
				pathname: '/tracking'
			})
		}
	}

	handleLogin = (e) => {
		this.setState({ loading: true })
		e.preventDefault()
		authentication
			.submitLogin(this.state.email, this.state.password)
			.then((response) => {
				if (response.data.autenticado === true) {

					localStorage.setItem('user', JSON.stringify(response.data.data))
					this.setState({ show: true, loading: false })
					this.redirectPage()
				} else {

					this.setState({ error: true, loading: false })
				}
			})
			.catch((error) => {
				this.setState({ error: true })
			})
	}

	render() {
		return (
			<div className="main">
				<div className="login-information">
					<div className="logo-login">
						<Image src={logoNZN} height="44px" width="173px" />
					</div>
					<form onSubmit={this.handleLogin} className="container">
						<div className="user-information">
							<p>Entrar</p>
							<InputLabel callback={(e) => this.setState({ email: e })} label="E-mail" placeholder="exemplo@email.com.br" />
							<InputLabel callback={(e) => this.setState({ password: e })} label="Senha" placeholder="Senha de acesso" type="password" />
							{this.state.error ? <spam color="red"> usuário/senha incorreta</spam> : <></>}
						</div>
						{this.state.loading ? (<Loading />) : (<></>)}
						<div className="box-button">
							<Button title="Acessar Conta" callback={this.handleLogin}></Button>
						</div>
					</form>
				</div>
				<div className="background-information">
					<h1>Mensurar o conhecimento e estimular o engajamento nunca foi tão simples</h1>

					<div className="containerImage">
						<Image src={backgroundLogin} height="544" width="727" />
					</div>
				</div>
			</div>
		)
	}
}

export default Login
