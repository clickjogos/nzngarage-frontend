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
      currentPage: 1,
      resultsPerPage: 15,
      orderBy: 'Search Volume,competitorPosition',
      orderType: 'desc,asc',
      loading: true,
      competitorResult: null,
      competitor: null
    }
  }

  componentDidMount() {
    // this.setState({ loading: true })

		this.allRequest()
	}

	async allRequest() {
		try {
		  const result = await competitorsService.getKeyWordsList(this.state.currentPage,this.state.resultsPerPage,this.state.orderBy,this.state.orderType)
      const keyWordArray = result.data.keyWordsArray
      console.log(keyWordArray)
      if (keyWordArray.length > 0) this.setState({ competitor: keyWordArray })
      else this.setState({ competitorResult: null })

      this.setState({ loading: false })
		} catch (error) { 
      this.setState({ loading: false, competitorResult: null })
      console.log(error)
    }
  }

  // searchCompetitor = () => (
  //   <div className="container-flex">
  //     <div className="container-competitors">
  //       <h3 style={{ fontSize: '28px' }}>Selecione o Concorrente</h3>
  //       <form onSubmit={this.handleSubmit}>
  //         <InputLabelPlanning
  //           callback={(e) => this.setState({ competitorUrl: e })}
  //           value={this.state.competitorUrl}
  //           label="Selecione a URL do Concorrente"
  //           placeholder="http://..." />

  //         {/* {this.state.competitorResult && this.selectCompetitor()} */}
  //         <div className="container-step">
  //           <Button callback={() => this.handleSubmit} title="Visualizar a listagem de Keywords >" />
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // )

  showCompetitorKeyWords = () => (
    <div className="container-flex">
      <div className="container-competitors">
        <div className="container-back">
          <button onClick={() => this.setState({competitor: null})}>
            <img src={Backbutton} icon={<img src={Backbutton} />} />
          </button>
          <p id="back-text"> Voltar para a seleção do Concorrente</p>
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
              <th>Pos. Concorrente</th>
              <th>Pos. NZN</th>
              <th>TItulo Concorrente</th>
              <th>URL Concorrente</th>
            </tr>
          </thead>
          <tbody>
            {this.state.competitor.slice(0, this.state.resultsPerPage).map(e => (
              <tr>
                <td>{e.Keyword}</td>
                <td>{e['Search Volume']}</td>
                <td>{e.competitorPosition}</td>
                <td>{e.nznPosition}</td>
                <td>{e.competitorInfo.title}</td>
                <td><a target="_blank" href={e.competitorInfo.Url}>{e.competitorInfo.Url}</a></td>
              </tr>
            ))}
          </tbody>
          <div className= "container-send-button">
          <Button callback={() => this.handleSubmit} title="Enviar para sugestão de produção>" style={{fontSize: '16px', width: '307px'}}/>
          </div>
        </table>
      </div>
    </div>
  )
  pagination = () => {
    let pages = []
    const qtdPages = (this.state.competitor.length / 5).toFixed(0);
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
        {/* {!this.state.loading ?
          this.state.competitor ? this.showCompetitorKeyWords() : this.searchCompetitor()
          :
          <Loading />
        } */}
          { !this.state.loading ? this.showCompetitorKeyWords() :  <Loading />
        }
      </div>
    )
  }
}
