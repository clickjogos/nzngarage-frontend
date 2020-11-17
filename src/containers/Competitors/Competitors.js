import React, { Component } from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'
import InputLabelPlanning from '../../components/InputLabel/InputLabelPlanning'
import Loading from '../../components/Loading/Loading'

import history from '../App/history'
import { Redirect } from 'react-router-dom'

import * as competitorsService from '../../providers/competitors'

import './Competitors.scss'
const Backbutton = require("../../assets/icons/icon-back-button.svg");

export default class Competitors extends Component {
  constructor(props) {
    super(props)

    this.state = {
      competitorUrl: '',
      loading: false,
      competitorResult: null,
      competitor: null
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })

    try {
      const result = await competitorsService.getKeyWordsList(this.state.competitorUrl)
      const keyWordArray = result.data.keyWordsArray

      if (keyWordArray.length > 0) this.setState({ competitorResult: keyWordArray })
      else this.setState({ competitorResult: null })

      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false, competitorResult: null })
      console.log(error)
    }

  }

  showCompetitor(url) {
    var competitor = this.state.competitorResult.filter((el) => {
      return el.competitor === url
    });
    this.setState({ competitor: competitor[0] })
  }

  selectCompetitor = () => (
    <React.Fragment>
      <label>Nome do concorrente:</label>
      <select defaultValue={''} onClick={(e) => this.showCompetitor(e.target.value)} >
        <option selected disabled>Selecione o concorrente</option>
        {this.state.competitorResult.map(e => (
          <option
            key={e._id}
            value={e.competitor}>
            {e.competitor}
          </option>
        ))}
      </select>
    </React.Fragment>
  )

  searchCompetitor = () => (
    <div className="container-flex">
      <div className="container-competitors">
        <h3 style={{ fontSize: '28px' }}>Selecione o Concorrente</h3>
        <form onSubmit={this.handleSubmit}>
          <InputLabelPlanning
            callback={(e) => this.setState({ competitorUrl: e })}
            value={this.state.competitorUrl}
            label="Selecione a URL do Concorrente"
            placeholder="http://..." />

          {this.state.competitorResult && this.selectCompetitor()}
          <div className="container-step">
            <Button callback={() => this.handleSubmit} title="Visualizar a listagem de Keywords >" />
          </div>
        </form>

      </div>
    </div>
  )

  showCompetitorKeyWords = () => (
    <div className="container-flex">
      <div className="container-competitors">
        <div className="container-back">
          <button onClick={() => this.setState({competitor: null})}>
            <img src={Backbutton} icon={<img src={Backbutton} />} />
          </button>
          <p id="back-text"> Voltar para a Lista de Planejamento</p>
        </div>
        <div className="competitors-title">
          <h3 style={{ fontSize: '28px' }}>Selecionar a(s) Keywords(s)</h3>
          <h4 style={{ fontSize: '18px', color: '#636F7A' }}>Vamos fazer isso em dois passos ;)</h4>
        </div>
        <table>
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Volume de Busca</th>
              <th>Pos. NZN</th>
              <th>TItulo Concorrente</th>
              <th>URL Concorrente</th>
            </tr>
          </thead>
          <tbody>
            {this.state.competitor.keywords.slice(0, 5).map(e => (
              <tr>
                <td>{e.Keyword}</td>
                <td>{e['Search Volume']}</td>
                <td>{e.nznPosition}</td>
                <td>{e.competitorInfo.title}</td>
                <td><a target="_blank" href={e.competitorInfo.Url}>{e.competitorInfo.Url}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.pagination()}
      </div>
    </div>
  )

  pagination = () => {
    let pages = []
    const qtdPages = (this.state.competitor.keywords.length / 5).toFixed(0);
    for (let index = 0; index < qtdPages; index++) { pages.push(index) }
    return (
      <div className="container-pagination">
        <button> {'<'} </button>
        {pages.map(e => (<p key={e}>{e}</p>))}
        <button> {'>'} </button>
      </div>
    )
  }

  render() {
    return (
      <div className="refine-planning-main">
        <Sidebar></Sidebar>
        {!this.state.loading ?
          this.state.competitor ? this.showCompetitorKeyWords() : this.searchCompetitor()
          :
          <Loading />
        }
      </div>
    )
  }
}
