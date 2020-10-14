import React, { Component } from 'react'

import './InputLabelPlanning.scss'
export default class InputLabelPlanning extends Component {
  render() {
    return (
      <div className='container-inputlabel'>
        <label>{this.props.label}</label>
        <div className="container-input-icon">
          <input className="input" 
          value={this.props.value} 
          onChange={(e) => this.props.callback(e.target.value)} 
          placeholder={this.props.placeholder} type={this.props.type} />
          {this.props.icon && this.props.icon}
        </div>
      </div>
    )
  }
}
