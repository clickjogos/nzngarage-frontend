import React, { Component } from 'react'

import './InputLabel.scss'
export default class InputLabel extends Component {
  render() {
    return (
      <div className='container-inputlabel'>
        <label>{this.props.label}</label>
        <div className="container-input-icon">
          <input className="input" placeholder={this.props.placeholder} type={this.props.type} onChange={(e) => this.props.callback(e.target.value)} />
          {this.props.icon && this.props.icon}
        </div>
      </div>
    )
  }
}
