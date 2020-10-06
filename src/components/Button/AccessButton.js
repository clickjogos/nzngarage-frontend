import React, { Component } from 'react'
import './AccessButton.scss'


export default class AccessButton extends Component {
  render() {
    return (
        <div>
      <button className="button-access" onClick={() => this.props.callback()}>{this.props.title}</button>
    </div>  
    )
  }
}

