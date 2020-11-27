import React, { Component } from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/Loading'

import ReactTooltip from 'react-tooltip';

import { Redirect } from 'react-router-dom'

import * as competitorsService from '../../providers/competitors'

import './Competitors.scss'

const Backbutton = require("../../assets/icons/icon-back-button.svg")
const ButtonChevronLeft = require('../../assets/icons/icon-button-left-arrow.svg')
const ButtonChevronRight = require('../../assets/icons/icon-button-right-arrow.svg')
const Chevron = require('../../assets/icons/chevron-right.svg')
const Tooltip = require('../../assets/icons/icon-tooltip.svg')
const Trash = require('../../assets/icons/icon-config.svg')

export default class Competitors extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: {
        currentPage: 1,
        totalPages: 0,
        resultsPerPage: 10,
        orderBy: 'Search Volume,competitorPosition',
        orderType: 'desc,asc',
      },
      orderArray: {
        volume: true,
        pos: true, 
        posNzn: true
      },
      loading: false,
      keyWordsList: [],
      keyWordsSelected: [],
      buttonKeywordDisabled: true,
      buttonSuggestionDisabled: false,
      review: false,
      redirect: false
    }
  }

  componentDidMount() {
    this.allKeywordsList()
  }

  async allKeywordsList() {
    try {
      const result = await competitorsService.getKeyWordsList(this.state.page)
      const keyWordsList = result.data.keyWordsArray
      
      let page = this.state.page
      let currentPage = result.data.currentPage
      let totalPages = result.data.totalPages
      page.currentPage = currentPage
      page.totalPages = totalPages

      console.log(page)
      if (keyWordsList.length > 0) {
        // added checked in object
        keyWordsList.forEach(element => {
          element.competitors.forEach(c => {
            c.checked = false
            c.show = false
            element.competitorPosition = c.competitorPosition
          })
        });
        this.setState({ keyWordsList, page })
      }
      else this.setState({ keyWordsList: null })

      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false, keyWordsList: null })
      console.log(error)
    }
  }

  orderArrayBy(key) {
    let keyWordsList = this.state.keyWordsList
    let orderArray = this.state.orderArray
    let status = true
    if(key === 'Search Volume'){
      orderArray.volume = !orderArray.volume
      status = !orderArray.volume
    }
    if(key === 'competitorPosition'){
      orderArray.pos = !orderArray.pos
      status = !orderArray.pos
    }
    if(key === 'nznPosition'){
      orderArray.posNzn = !orderArray.posNzn
      status = !orderArray.posNzn
    }

    if(status){
      keyWordsList.sort(function (a, b) {
        return parseFloat(a[key]) - parseFloat(b[key]);
      });
    } else {
      keyWordsList.sort(function (a, b) {
        return parseFloat(b[key]) - parseFloat(a[key]);
      });
    }
  

    this.setState({ keyWordsList, orderArray })
  }

  keyWordCheck = (checked, _id) => {

    let keyWordsList = this.state.keyWordsList;
    let buttonKeywordDisabled = true;

    keyWordsList.forEach(element => {
      element.competitors.forEach(c => {
        if (c._id === _id) c.checked = !c.checked
        if (c.checked) buttonKeywordDisabled = false
      });
    })

    this.setState({ keyWordsList, buttonKeywordDisabled })
  }

  keyWordCheckSelect = (checked, _id) => {

    let keyWordsSelected = this.state.keyWordsSelected;
    let buttonSuggestionDisabled = true;

    keyWordsSelected.forEach(element => {
      if (element._id === _id) element.checked = !element.checked
      if (element.checked) buttonSuggestionDisabled = false
    })

    this.setState({ keyWordsSelected, buttonSuggestionDisabled })
  }


  sendToReview = () => {
    let keyWordsList = this.state.keyWordsList;
    let keyWordsSelected = []
    keyWordsList.forEach(element => {
      element.competitors.forEach(c => {
        if (c.checked === true) {
          c.Keyword = element.Keyword
          c['Number of Results'] = element['Number of Results']
          c['Search Volume'] = element['Search Volume']
          c.nznPosition = element.nznPosition

          keyWordsSelected.push(c)
        }
      });
    })

    this.setState({ keyWordsSelected, review: true, buttonSuggestionDisabled: false })
  }

  async sendKeywords() {
    this.setState({ loading: true })
    let array = this.state.keyWordsSelected;
    var selectedKeywords = array.page(function (el) {
      return el.checked = true
    });

    selectedKeywords.forEach(element => {
      delete element.checked;
      delete element.show;
    });

    const obj = {
      selectedKeywords
    }

    try {
      const result = await competitorsService.weeklyschedule(obj)
      this.setState({loading: false, redirect: true})
    } catch (error) {
      console.log(error)
      this.setState({loading: false})
    }
  }

  actionCollapse = (element) => {
    let keyWordsList = this.state.keyWordsList;

    keyWordsList.forEach(e => {
      if(e.Keyword === element.Keyword) {
        e.show = !e.show
      }
    });
    
    this.setState({keyWordsList},r => {
      ReactTooltip.rebuild();
    })
  }

  actionPage = (status) => {
    let page = this.state.page
    if(!status && page.currentPage !== 1) page.currentPage -= 1
    if(status && page.currentPage < page.totalPages) page.currentPage +=1
    this.setState({page}, r=> {
      this.allKeywordsList()
    })
  }

  actionChangePage = (currentPage) => {
    let page = this.state.page
    if(currentPage > 0 && currentPage <= page.totalPages){
      page.currentPage = currentPage
      this.setState({page}, r=> {
        this.allKeywordsList()
      })
    }
  }

  actionRows = (rows) => {
    let page = this.state.page
    if(rows <= 50 && rows >= 10){
      page.resultsPerPage = rows 
      this.setState({page}, r=> {
        this.allKeywordsList()
      })
    }
  }

  deleteKeyword = async (keyword, domain) => {
    try {
      const result = await competitorsService.deleteUniqueKeyword(keyword, domain)
      console.log(result)
      this.allKeywordsList()
    } catch (error) {
      console.log(error)
    }
  }

  pagination = () => {
    return (
      <div className="container-pagination">
        <div onClick={() => this.actionPage(false)} className="container-pagination-button">
          <img src={ButtonChevronLeft} />
          <p>Página Anterior</p>
        </div>
        <div className="pagination-info">
          <div className="pagination-input">
            <p>Página</p>
            <input onChange={(e) => this.actionChangePage(e.target.value)} value={this.state.page.currentPage} type="number" />
            <p>de {this.state.page.totalPages}</p>
          </div>
          <div className="pagination-input">
            <p>Exibindo</p>
            <input onChange={(e) => this.actionRows(e.target.value)} value={this.state.page.resultsPerPage} type="number" />
            <p>por página</p>
          </div>
        </div>
        <div onClick={() => this.actionPage(true)} className="container-pagination-button">
          <p>Próxima Página</p>
          <img src={ButtonChevronRight} />
        </div>
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
              <th></th>
              <th></th>
              <th>Keyword</th>
              <th onClick={() => this.orderArrayBy('Search Volume')}>Volume de Busca <img style={this.state.orderArray.volume ? {transform: 'rotate(180deg)'} : null} className="chevron" src={Chevron}/></th>
              <th onClick={() => this.orderArrayBy('competitorPosition')}>Pos. Concorrente <img style={this.state.orderArray.pos ? {transform: 'rotate(180deg)'} : null} className="chevron" src={Chevron}/></th>
              <th onClick={() => this.orderArrayBy('nznPosition')}>Pos. NZN <img style={this.state.orderArray.posNzn ? {transform: 'rotate(180deg)'} : null} className="chevron" src={Chevron}/></th>
              <th>TItulo Concorrente</th>
              <th >URL Concorrente</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.keyWordsList.map(e => (
              <React.Fragment>
                <tr>
                  <td onClick={() => this.actionCollapse(e)}><img style={e.show ? {transform: 'rotate(0deg)'} : null} id="toggleImage" src={Chevron}/></td>
                  <td className="competitors-length">{e.competitors.length}</td>
                  <td className={e.show ? 'keyword-text' : null}>{e.Keyword}</td>
                  <td>{e['Search Volume']}</td>
                  <td>{e.competitors.length > 0 && e.competitors[0].competitorPosition}</td>
                  <td>{e.nznPosition}</td>
                  <td><p data-tip={e.competitors[0].competitorInfo.title}>{(e.competitors[0].competitorInfo.title).substring(0, 29)}{(e.competitors[0].competitorInfo.title).length > 29 && '...'} <img src={Tooltip} /> </p> </td>
                  <td><a target="_blank" href={e.competitors[0].competitorInfo.Url}>{e.competitors[0].competitorInfo.Url} ↗</a></td>
                  <td></td>
                </tr>
                {e.competitors.map(c => (
                  e.show && 
                    <tr key={c._id}>
                      <td></td>
                      <td><div onClick={() => this.keyWordCheck(c.checked, c._id)} id="checkbox"> {c.checked && <span></span>} </div></td>
                      <td>{e.Keyword}</td>
                      <td>{c['Search Volume']}</td>
                      <td>{c.competitorPosition}</td>
                      <td>{c.nznPosition}</td>
                      <td><p data-tip={c.competitorInfo.title}>{(c.competitorInfo.title).substring(0, 29)}{(c.competitorInfo.title).length > 29 && '...'} <img src={Tooltip} /> </p> </td>
                      <td><a target="_blank" href={c.competitorInfo.Url}>{c.competitorInfo.Url} ↗</a></td>
                      <td onClick={() => this.deleteKeyword(e.Keyword, c.competitor)}><img src={Trash} /></td>
                    </tr>
                ))}
                <ReactTooltip backgroundColor={'white'} textColor={'#414141'} borderColor={'#DBE1E5'} />
              </React.Fragment>

            ))}
          </tbody>
        </table>
        {this.pagination()}
        <div className="container-send-button">
          <Button
            callback={() => this.sendToReview()}
            disabled={this.state.buttonKeywordDisabled}
            title="Continuar >" />
        </div>
      </div>
    </div>
  )


  showReview = () => (
    <div className="container-flex">
      <div className="container-competitors">
        <div className="container-back">
          <button onClick={() => this.setState({ review: false })}>
            <img src={Backbutton} icon={<img src={Backbutton} />} />
          </button>
          <p id="back-text"> Voltar para a seleção de Keywords</p>
        </div>
        <div className="competitors-title">
          <h3 style={{ fontSize: '28px' }}>Revisão da(s) Keyword(s) selecionada(s)</h3>
          <h4 style={{ fontSize: '18px', color: '#636F7A' }}>Vamos fazer isso em dois passos ;)</h4>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Keyword</th>
              <th>Volume de Busca</th>
              <th>Pos. Concorrente</th>
              <th>Pos. NZN</th>
              <th >TItulo Concorrente</th>
              <th>URL Concorrente</th>
            </tr>
          </thead>
          <tbody>
            {this.state.keyWordsSelected.map(e => (
              <React.Fragment>
                <tr>
                  <td><div onClick={() => this.keyWordCheckSelect(e.checked, e._id)} id="checkbox"> {e.checked && <span></span>} </div></td>
                  <td>{e.Keyword}</td>
                  <td>{e['Search Volume']}</td>
                  <td>{e.competitorPosition}</td>
                  <td>{e.nznPosition}</td>
                  <td><p data-tip={e.competitorInfo.title}>{(e.competitorInfo.title).substring(0, 29)}{(e.competitorInfo.title).length > 29 && '...'} </p> </td>
                  <td><a target="_blank" href={e.competitorInfo.Url}>{e.competitorInfo.Url} ↗</a></td>
                </tr>
                <ReactTooltip backgroundColor={'white'} textColor={'#414141'} borderColor={'#DBE1E5'} />
              </React.Fragment>

            ))}
          </tbody>
        </table>
        <div className="container-send-button">
          <Button
            disabled={this.state.buttonSuggestionDisabled}
            callback={() => this.sendKeywords()}
            title="Enviar para sugestão de produção ❯" />
        </div>
      </div>
    </div>
  )

  render() {
    const { redirect } = this.state
    if(redirect) return (<Redirect to="/suggestion" />)

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

