import React, { Component } from 'react'

import Button from '../../components/Button/ButtonCreate'

import './Modal.scss'

export default class ModalEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      objKeyword: null
    }
  }


  componentDidMount(){
    let objKeyword = this.props.data
    if(objKeyword.internalBacklinks.length === 0){
      objKeyword.internalBacklinks.push('')
    }
    this.setState({objKeyword})
  }

  handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let objKeyword = this.state.objKeyword;

    objKeyword[name] = value;

    if(name === 'cmsLink'){
      var re = /(post=[0-9]+)/;
      var found = objKeyword.cmsLink.match(re);
      let articleId = found[0].split(/=/)
      objKeyword['articleId'] = Number(articleId[1])
    }
    objKeyword['titleLength'] = objKeyword.title.length
    
    this.setState({ objKeyword })
  }

  addedLinkInt = () => {
    let objKeyword = this.state.objKeyword;

    objKeyword.internalBacklinks.push("")
    this.setState({objKeyword})
  }

  changeLinkInt = (index, value) => {
    let objKeyword = this.state.objKeyword;

    objKeyword.internalBacklinks[index] = value;

    this.setState({objKeyword})
  }

  deleteLinkInt = (index) => {
    let objKeyword = this.state.objKeyword;

    objKeyword.internalBacklinks.splice(index, 1 );

    this.setState({objKeyword})
  }

  sendKeywordEdit = () => {
    let objKeyword = this.state.objKeyword;

    objKeyword.internalBacklinks.forEach((element, index) => {
      if(element.trim() === ""){
        objKeyword.internalBacklinks.splice(index, 1 );
      } 
    });

    this.props.callback(objKeyword)
  }

  render() {
    return (
      this.state.objKeyword && 
      <div className="modal-main">
        <div className="modal-content-edit">
          <div className="header-top">
            <p>Editar Keyword - <span>{this.props.data.Keyword}</span></p>
            <span onClick={() => this.props.close()} className="close">
              &times;
        </span>
          </div>
          <div className="center-modal-edit">
            <div className="input-edit">
              <label>Caderno</label>
              <select name={'tag'} onChange={this.handleInput}>
                <option value="Internet">Internet</option>
              </select>
            </div>
            <div className="input-edit-elements">
              <div className="group">
                <label>Status</label>
                <select name={'status'} onChange={this.handleInput}>
                  <option value={""} selected> - </option>
                  <option value="Em produção">Em produção</option>
                  <option value="Agendado">Agendado</option>
                  <option value="Publicado">Publicado</option>
                </select>
              </div>
              <div className="group">
                <label>Data de Publicação</label>
                <input type="date" />
              </div>
              <div className="group">
                <label>Esti. de tráfego</label>
                <input disabled value={this.state.objKeyword.ctr} type="text" />
              </div>
              <div className="group">
                <label>Posição</label>
                <input disabled value={this.state.objKeyword.competitorPosition} disabled type="number" />
              </div>
            </div>
            <div className="input-duo">
              <div className="input-duo-camp">
                <label>Linkagem CMS</label>
                <input onChange={this.handleInput} value={this.state.objKeyword['cmsLink']} name={'cmsLink'} type="text" />
              </div>
              <div className="input-unique-camp">
                <label>Código da Matéria</label>
                <input value={this.state.objKeyword['articleId']} name={'articleId'} disabled type="text" />
              </div>
            </div>
            <div className="input-unique-count">
              <span>
                <label>Título Sugerido</label>
                <p>{this.state.objKeyword.title.length} caracteres</p>
              </span>
              <input onChange={this.handleInput} name={'title'} value={this.state.objKeyword.title} type="text" />
            </div>
            <div className="input-unique">
              <label>Linkagem interna - <span onClick={() => this.addedLinkInt()}>Adicionar nova linkagem</span></label>
              {this.state.objKeyword.internalBacklinks.map((e, i) => (
                <div key={i} className="linkInt">
                  <input placeholder="Digite a linkagem interna" value={e} onChange={(event) => this.changeLinkInt(i, event.target.value)} type="text" />
                  <span onClick={() => this.deleteLinkInt(i)} className="close"> &times;</span>
                </div>
              ))}

            </div>
            <div className="input-unique-count">
              <span>
                <label>Título do concorrente</label>
                <p>{this.state.objKeyword.competitorInfo.titleLength} caracteres</p>
              </span>
              <input disabled value={this.state.objKeyword.competitorInfo.title} type="text" />
            </div>
          </div>
          <div className="bottom-modal-edit">
            <Button callback={() => this.sendKeywordEdit()} title='Concluir Edição' />
          </div>
        </div>
      </div>
    )
  }
}