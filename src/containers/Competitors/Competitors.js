import React, { Component } from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'
import InputLabelPlanning from '../../components/InputLabel/InputLabelPlanning'
import Loading from '../../components/Loading/Loading'

import ReactTooltip from 'react-tooltip';

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
      currentPage: 1,
      resultsPerPage: 10,
      orderBy: 'Search Volume,competitorPosition',
      orderType: 'desc,asc',
      loading: true,
      competitorResult: null,
      arraySelect: [],
      review: false
    }
  }

  componentDidMount() {
    this.allRequest()
  }

  async allRequest() {
    try {
      const result = await competitorsService.getKeyWordsList(this.state.currentPage, this.state.resultsPerPage, this.state.orderBy, this.state.orderType)
      const keyWordArray = result.data.keyWordsArray
      if (keyWordArray.length > 0) this.setState({ competitorResult: keyWordArray })
      else this.setState({ competitorResult: null })

      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false, competitorResult: null })
      console.log(error)
    }
  }

  orderArrayBy(key) {
    let competitorResult = this.state.competitorResult
    competitorResult.sort(function (a, b) {
      return parseFloat(a[key]) - parseFloat(b[key]);
    });
    this.setState({ competitorResult })
  }

  addArraySelect = (element) => {

    let arraySelect = this.state.arraySelect;

    const isOnArray = (arraySelect.findIndex(e => e._id === element._id));

    if (isOnArray === -1) {
      arraySelect.push(element)
    } else {
      var index = arraySelect.findIndex(function (o) {
        return o._id === element._id;
      })
      if (index !== -1) arraySelect.splice(index, 1);
    }

    this.setState({arraySelect})
  }

  pagination = () => {
    return (
      <div className="container-pagination">
        <button> {'<'} Pagina Anterior</button>
        <div className="pagination-info">
          <div className="pagination-input">
            <p>Página</p>
            <input type="text" />
            <p>de 20</p>
          </div>
          <div className="pagination-input">
            <p>Exibindo</p>
            <input onChange={(e) => this.setState({ resultsPerPage: e.target.value })} value={this.state.resultsPerPage} type="number" />
            <p>por página</p>
          </div>
        </div>
        <button> Próxima página {'>'} </button>
      </div>
    )
  }

  showCompetitorKeyWords = () => (
    <div className="container-flex">
      <div className="container-competitors">
        <div className="competitors-title">
          <h3 style={{ fontSize: '28px' }}>Selecionar a(s) Keywords(s)</h3>
          <h4 style={{ fontSize: '18px', color: '#636F7A' }}>Vamos fazer isso em dois passos ;)</h4>
        </div>
        <table>
          <thead>
            <tr>
              <th width="30"></th>
              <th onClick={() => this.orderArrayBy('Keyword')}>Keyword</th>
              <th onClick={() => this.orderArrayBy('Search Volume')}>Volume de Busca</th>
              <th>Pos. Concorrente</th>
              <th onClick={() => this.orderArrayBy('nznPosition')}>Pos. NZN</th>
              <th width="250">TItulo Concorrente</th>
              <th width="400">URL Concorrente</th>
            </tr>
          </thead>
          <tbody>
            {this.state.competitorResult.map(e => (
              <React.Fragment>
                <tr>
                  <td>{'>'}</td>
                  <td>{e.Keyword}</td>
                  <td>{e['Search Volume']}</td>
                  <td>{e.competitors.length > 0 && e.competitors[0].competitorPosition}</td>
                  <td>{e.nznPosition}</td>
                  <td><p data-tip={e.competitors[0].competitorInfo.title}>{(e.competitors[0].competitorInfo.title).substring(0, 29)}{(e.competitors[0].competitorInfo.title).length > 29 && '...'} </p> </td>
                  <td><a target="_blank" href={e.competitors[0].competitorInfo.Url}>{e.competitors[0].competitorInfo.Url}</a></td>
                </tr>
                {e.competitors.map(c => (
                  <tr>
                    <td><input onChange={() => this.addArraySelect(c)} type="checkbox" /></td>
                    <td>{c.Keyword}</td>
                    <td>{c['Search Volume']}</td>
                    <td>{c.competitorPosition}</td>
                    <td>{c.nznPosition}</td>
                    <td><p data-tip={c.competitorInfo.title}>{(c.competitorInfo.title).substring(0, 29)}{(c.competitorInfo.title).length > 29 && '...'} </p> </td>
                    <td><a target="_blank" href={c.competitorInfo.Url}>{c.competitorInfo.Url}</a></td>
                  </tr>
                ))}
              </React.Fragment>

            ))}
          </tbody>
        </table>
        {this.pagination()}
        <div className="container-send-button">
          <Button callback={() => this.setState({review: true})} title="Continuar >" style={{ fontSize: '16px', width: '307px' }} />
        </div>
      </div>
      <ReactTooltip backgroundColor={'white'} textColor={'#414141'} borderColor={'#DBE1E5'} />
    </div>
  )


  showReview = () => (
    <div className="container-flex">
      <div className="container-competitors">
        <div className="competitors-title">
          <h3 style={{ fontSize: '28px' }}>Revisão da(s) Keyword(s) selecionada(s)</h3>
          <h4 style={{ fontSize: '18px', color: '#636F7A' }}>Vamos fazer isso em dois passos ;)</h4>
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
            {this.state.arraySelect.map(e => (
              <React.Fragment>
                <tr>
                  <td><input checked={true} onChange={() => this.addArraySelect(e)} type="checkbox" /></td>
                  <td>{e.Keyword}</td>
                  <td>{e['Search Volume']}</td>
                  <td>{e.competitorPosition}</td>
                  <td>{e.nznPosition}</td>
                  <td><p data-tip={e.competitorInfo.title}>{(e.competitorInfo.title).substring(0, 29)}{(e.competitorInfo.title).length > 29 && '...'} </p> </td>
                  <td><a target="_blank" href={e.competitorInfo.Url}>{e.competitorInfo.Url}</a></td>
                </tr>
              </React.Fragment>

            ))}
          </tbody>
        </table>
        <div className="container-send-button">
          <Button callback={() => this.handleSubmit} title="Enviar para sugestão de produção ❯" style={{ fontSize: '16px', width: '307px' }} />
        </div>
      </div>
      <ReactTooltip backgroundColor={'white'} textColor={'#414141'} borderColor={'#DBE1E5'} />
    </div>
  )

  render() {
    return (
      <div className="refine-planning-main">
        <Sidebar></Sidebar>
        { !this.state.loading ? 
          <React.Fragment>
              {this.state.review ? 
                this.showReview()
                :
                this.showCompetitorKeyWords()
              }
          </React.Fragment>
        : <Loading />}
      </div>
    )
  }
}

