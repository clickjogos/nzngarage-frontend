import React from 'react'

import './Modal.scss'

export default function ModalEdit() {
  return (
    <div className="modal-main">
    <div className="modal-content">
      <div className="header-top">
        <span className="close" onClick={this.props.onClose}>
          &times;
        </span>
      </div>
      <div className="center-modal">
        {/* <img src={Rocket} />
        <div className="modal-footer">
          <p className="modal-title">{this.props.title}</p>
          <p className="modal-subtitle">{this.props.subtitle}</p>
        </div>
        <Button callback={() => this.props.onRedirect()} title="Replanejar agora!" /> */}
      </div>
    </div>
  </div>
  )
}
