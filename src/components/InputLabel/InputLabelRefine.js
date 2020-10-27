import React, { Component } from 'react'
import './InputLabelRefine.scss'
import {formatWeekDay} from '../../utils/format'

export default class InputLabelRefine extends Component {

	renderSwitchMainDiv(param) {
		if (param.active) return {}
		else if (param.readonly) return { pointerEvents: 'none' }
		else if (param.disabled) return { pointerEvents: 'none', opacity: '0.4' }
		else return { pointerEvents: 'none' }
	}

	renderSwitchLabel(param) {
		if (param.active) return { color: '#2944D9', fontWeight: 'bold' }
		else return { pointerEvents: 'none' }
	}

	renderSwitchInputDiv(param) {
		if (param.active) return { border: '2px solid #2944D9', borderRadius: '8px', color: '#2944D9' }
		else return { pointerEvents: 'none' }
	}

	renderSwitchInput(param) {
		if (param.active) return { color: '#2944D9', fontWeight: 'bold', pointerEvents: 'none' }
		else return { pointerEvents: 'none' }
	}


	render() {
		return (
			<div style={this.props.filter ? this.renderSwitchMainDiv(this.props.filter) : {}} className="container-inputlabel-refine">
				<label style={this.props.filter ? this.renderSwitchLabel(this.props.filter) : {}} onClick={(e) => this.props.onclick(this.props.label)}>
					{this.props.category ? (formatWeekDay(this.props.label)) : this.props.label}
				</label>
				<div style={
					this.props.width ? { width: "30px" } : {}
				}>
					<div style={this.props.filter ? this.renderSwitchInputDiv(this.props.filter) : {}} className="container-input-icon-refine">
						<input
							style={this.props.filter ? this.renderSwitchInput(this.props.filter) : {}}
							className="input"
							value={this.props.value}
							onChange={(e) => this.props.callback(e.target.value)}
							placeholder={this.props.placeholder}
							type={this.props.type}
						/>
						{this.props.icon && this.props.icon}
					</div>
				</div>

			</div>
		)
	}
}
