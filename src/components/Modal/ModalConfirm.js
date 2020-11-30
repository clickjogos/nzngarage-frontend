import React from 'react'

import Button from '../Button/Button'

export default function ModalConfirm(props) {
  return (
    <div className="modal-main">
      <div className="modal-content-confirm">
        <div className="header-top">
          <p>Confirmação</p>
          <span onClick={() => props.cancel()} className="close">
            &times;
        </span>
        </div>
        <div className="center-modal-confirm">
          <p>Tem certeza que deseja excluir está Keyword permanentemente?</p>
        </div>
        <div className="bottom-modal-confirm">
          <Button callback={() => props.cancel()} title='Cancelar' />
          <Button callback={() => props.confirm()} title='Deletar Keyword' />
        </div>
      </div>
    </div>
  )
}
