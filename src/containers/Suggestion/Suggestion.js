import React, { Component } from 'react'

import ReactTooltip from 'react-tooltip'

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'

import './Suggestion.scss'

export default class Suggestion extends Component {
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
                  <th width="30"></th>
                  <th>Keyword</th>
                  <th>Volume de Busca</th>
                  <th>Pos. Concorrente</th>
                  <th>Pos. NZN</th>
                  <th width="250">TItulo Concorrente</th>
                  <th width="400">URL Concorrente</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.state.keyWordsSelected.map(e => (
                  <React.Fragment>
                    <tr>
                      <td><input checked={e.checked} onChange={(event) => this.keyWordCheckSelect(event.target.checked, e._id)} type="checkbox" /></td>
                      <td>{e.Keyword}</td>
                      <td>{e['Search Volume']}</td>
                      <td>{e.competitorPosition}</td>
                      <td>{e.nznPosition}</td>
                      <td><p data-tip={e.competitorInfo.title}>{(e.competitorInfo.title).substring(0, 29)}{(e.competitorInfo.title).length > 29 && '...'} </p> </td>
                      <td><a target="_blank" href={e.competitorInfo.Url}>{e.competitorInfo.Url}</a></td>
                    </tr>
                  </React.Fragment>

                ))} */}
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
