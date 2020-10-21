import React, { Component } from "react";
import "./ButtonCreate.scss";

export default class ButtonCreate extends Component {
  render() {
    return (
      <div >
        <button style={this.props.style ? this.props.style : {}} className="buttonCreate" onClick={(e) => this.props.callback(e)}>
          {this.props.title}
        </button>
      </div>
    );
  }
}
