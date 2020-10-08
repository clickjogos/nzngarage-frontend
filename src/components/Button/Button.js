import React, { Component } from "react";
import "./Button.scss";

export default class Button extends Component {
  render() {
    return (
      <div >
        <button className="button" onClick={() => this.props.callback()}>
          {this.props.title}
        </button>

        {/* <button>
            <img src={Backbutton} icon={<img src={Backbutton} />} />
          </button>
          <p id="back-text"> Voltar para a Lista de Planejamento</p>
        </div> */}
      </div>
    );
  }
}
