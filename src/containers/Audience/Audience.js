import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Audience.scss'
const Backbutton = require("../../assets/icons/icon-back-button.svg");

class Audience extends Component {
	constructor(props) {
		super(props)

		this.state = {
			show: true,
		}
    }
    render () { 
        return ( 
            <h1> Oi </h1>
        )
    }
}
export default Audience