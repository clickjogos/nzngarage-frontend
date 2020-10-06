import React, { Component } from 'react'
import './Text.scss'
export default class Text extends Component {
  render() {
    return (
      <div className='container-inputlabel'>
        <h1>{this.props.text}</h1>
        </div>
    )
  }
}