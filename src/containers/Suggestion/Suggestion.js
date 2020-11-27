import React, { Component } from 'react'

import ReactTooltip from 'react-tooltip'

import * as ServiceSuggestion from '../../providers/competitors';

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'

import './Suggestion.scss'

const IconEdit = require('../../assets/icons/icon-edit.svg')

export default class Suggestion extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      scheduledKeywords: []
    }
  }
  

  componentDidMount() {
    this.getSuggestions()
  }

  async getSuggestions() {
    try {
      const result = await ServiceSuggestion.searchWeeklySchedule({})
      let schedule = result.data.schedule
      let scheduledKeywords = []

      schedule.forEach(element => {
        element.scheduledKeywords.forEach(e => {
          scheduledKeywords.push(e)
        });
      });
      console.log(scheduledKeywords)
      this.setState({scheduledKeywords})
    } catch (error) {
      
    }
  }


  render() {
    return (
      <div className="refine-planning-main">
        <Sidebar></Sidebar>
        <div className="container-flex">
          <div className="container-competitors">
            <div className="suggestion-title">
              <span>
                <h3>Sugestão de Produção</h3>
                <h4>Nessa parte se encontram as keywords selecionadas.</h4>
              </span>
              <div className="suggestion-filters">
                <select>
                  <option>Caderno</option>
                </select>
                <Button title="Semana" style={{ width: '99px' }}  />
                <Button title="Mês" style={{ width: '99px' }}  />
              </div>
            </div>
            <div className="suggestion-container-search">
              <div className="search">
                <span>Y</span>
                <input placeholder="Buscar por Keyword" type="text" />
              </div>
              <div className="search title">
                <span>Y</span>
                <input placeholder="Buscar por Título da Página" type="text" />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th >Caderno</th>
                  <th>Keyword</th>
                  <th>Volume de Busca</th>
                  <th>Qtd. Título</th>
                  <th>Status</th>
                  <th >Título Sugerido</th>
                  <th>URL Concorrente</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {this.state.scheduledKeywords.map(e => (
                  <React.Fragment>
                    <tr>
                      <td>Caderno</td>
                      <td>{e.Keyword}</td>
                      <td>{e['Search Volume']}</td>
                      <td>x</td>
                      <td>Status</td>
                      <td><p data-tip={e.competitorInfo.title}>{(e.competitorInfo.title).substring(0, 29)}{(e.competitorInfo.title).length > 29 && '...'} </p> </td>
                      <td><a target="_blank" href={e.competitorInfo.Url}>{e.competitorInfo.Url}</a></td>
                      <td><img className="edit-icon" src={IconEdit} /></td>
                    </tr>
                  </React.Fragment>

                ))}
              </tbody>
            </table>
            {/* <div className="container-send-button">
              <Button
                // disabled={this.state.buttonSuggestionDisabled}
                // callback={() => this.sendKeywords()}
                title="Enviar para sugestão de produção ❯" />
            </div> */}
          </div>
          <ReactTooltip backgroundColor={'white'} textColor={'#414141'} borderColor={'#DBE1E5'} />
        </div>
      </div>
    )
  }
}
