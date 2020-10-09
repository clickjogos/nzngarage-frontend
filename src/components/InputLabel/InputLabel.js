import React, { Component } from 'react'

import './InputLabel.scss'
export default class InputLabel extends Component {
  render() {
    return (
      <div className='container-inputlabel'>
        <label>{this.props.label}</label>
        <div className="container-input-icon">
          <input className="input" placeholder={this.props.placeholder}/>
          {this.props.icon && this.props.icon}
        </div>
      </div>
    )
  }
}

