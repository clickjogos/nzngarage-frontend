import React, { Component } from 'react'

import './InputLabelPlanning.scss'
export default class InputLabelPlanning extends Component {
	render() {
		return (
			<div style={this.props.filter ? (!this.props.filter.active ? {pointerEvents: "none", opacity: "0.4"} :{} ) : {} } className="container-inputlabel">
				<label  style={ this.props.filter?.active ? {color: "#2944D9", fontWeight: "bold"} : {} } onClick={(e) => this.props.onclick(this.props.label)}>{this.props.label}</label>
				<div style={ this.props.filter?.active ? {border: "2px solid #2944D9", borderRadius: "8px", color: "#2944D9"} : {} } className="container-input-icon">
					<input style={ this.props.filter?.active ? {color: "#2944D9", fontWeight: "bold"} : {} } className="input" value={this.props.value} onChange={(e) => this.props.callback(e.target.value)} placeholder={this.props.placeholder} type={this.props.type} />
					{this.props.icon && this.props.icon}
				</div>
			</div>
		)
	}
}

