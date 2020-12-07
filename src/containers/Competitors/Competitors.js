import React, { Component } from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/Loading'
import ModalConfirm from '../../components/Modal/ModalConfirm'

import ReactTooltip from 'react-tooltip';

import { Redirect } from 'react-router-dom'

import * as competitorsService from '../../providers/competitors'

import './Competitors.scss'

const Backbutton = require("../../assets/icons/icon-back-button.svg")
const ButtonChevronLeft = require('../../assets/icons/icon-button-left-arrow.svg')
const ButtonChevronRight = require('../../assets/icons/icon-button-right-arrow.svg')
const Chevron = require('../../assets/icons/chevron-right.svg')
const Tooltip = require('../../assets/icons/icon-tooltip.svg')
const Trash = require('../../assets/icons/icon-trash-can.svg')

export default class Competitors extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: {
        currentPage: 1,
        totalPages: 0,
        resultsPerPage: 10,
        orderBy: 'Search Volume',
        orderType: 'desc',
      },
      orderArray: {
        volume: true,
        pos: false, 
        posNzn: false
      },
      loading: false,
      keyWordsList: [],
      keyWordsSelected: [],
      preSelectedKeywords: [],
      buttonKeywordDisabled: true,
      buttonSuggestionDisabled: false,
      review: false,
      redirect: false,
      showModalConfirm: false,
      keywordDelete: null,
      pathDelete: null
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

      if (keyWordsList.length > 0) {
        // added checked in object
        keyWordsList.forEach(element => {
          element.competitors.forEach(c => {
            c.checked = false
            c.show = false
            element.competitorPosition = c.competitorPosition

            this.state.keyWordsSelected.forEach( kwSelected =>{
              if(kwSelected.Keyword == element.Keyword && kwSelected.competitor==c.competitor){
                c.checked = true
              }
            })
          })

         

          element.competitors.sort(function(a, b) {
            return a.competitorPosition - b.competitorPosition
          })

        })
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
    // let keyWordsList = this.state.keyWordsList
    let orderArray = this.state.orderArray
    let page = this.state.page
    let status = true

    if(key === 'Search Volume'){
      orderArray.volume = !orderArray.volume
      status = !orderArray.volume
      page.orderBy = 'Search Volume'
    }
    if(key === 'competitorPosition'){
      orderArray.pos = !orderArray.pos
      status = !orderArray.pos
      page.orderBy = 'competitorPosition'
    }
    if(key === 'nznPosition'){
      orderArray.posNzn = !orderArray.posNzn
      status = !orderArray.posNzn
      page.orderBy = 'nznPosition'
    }

    if(status) {
      page.orderType = 'asc'
    } else {
      page.orderType = 'desc'
    }

    this.setState({ orderArray, page }, r=> {
      this.allKeywordsList()
    })
  }

  keyWordCheck = (checked, _id) => {

    let keyWordsList = this.state.keyWordsList;
    let buttonKeywordDisabled = true;
    
    let preSelectedKeywords = this.state.preSelectedKeywords

    keyWordsList.forEach(element => {
      element.competitors.forEach(c => {
        if (c._id === _id) c.checked = !c.checked
        if (c.checked) {
          buttonKeywordDisabled = false
          if(preSelectedKeywords.length > 0) {
            let found = preSelectedKeywords.find( item=> item.Keyword == element.Keyword && item.competitors.includes(c.competitor))
            if(!found) preSelectedKeywords.push(element)
          } else {
            preSelectedKeywords.push(element)
          }
        }
      })
    })
    this.setState({ preSelectedKeywords, buttonKeywordDisabled })
  }

  keyWordCheckSelect = (checked, _id) => {

    let keyWordsSelected = this.state.keyWordsSelected;
    let buttonSuggestionDisabled = true;

    let preSelectedKeywords = this.state.preSelectedKeywords

    keyWordsSelected.forEach(element => {
      if (element._id === _id) element.checked = !element.checked
      if (element.checked) {
        buttonSuggestionDisabled = false
      } else {
        if(preSelectedKeywords.length > 0) {
          let indexToRemove
          preSelectedKeywords.map( (item, index)=> {
            if(item.Keyword == element.Keyword && item.competitors.includes(element.competitor)){
              indexToRemove = index
            }
          })
          if(indexToRemove !== -1) preSelectedKeywords.splice(indexToRemove, 1)
        } else {
          preSelectedKeywords.splice(0, 1)
        }
      }

    })

    this.setState({ keyWordsSelected, preSelectedKeywords, buttonSuggestionDisabled })
  }


  sendToReview = () => {
    let keyWordsList = this.state.preSelectedKeywords;
    let keyWordsSelected = []
    keyWordsList.forEach(element => {
      element.competitors.forEach(c => {
        if (c.checked === true) {
          c.Keyword = element.Keyword
          c['Number of Results'] = element['Number of Results']
          c['Search Volume'] = element['Search Volume']
          c.nznPosition = element.nznPosition
          c.simplyfiedKeyword = element.simplyfiedKeyword
          c.ctr = element.ctr
          keyWordsSelected.push(c)
        }
      });
    })

    this.setState({ keyWordsSelected, review: true, buttonSuggestionDisabled: false })
  }

  async sendKeywords() {
    this.setState({ loading: true })
    let array = this.state.keyWordsSelected;
    var selectedKeywords = array.filter(function (el) {
      return el.checked = true
    });

    selectedKeywords.forEach(element => {
      delete element.checked;
      delete element.show;
    });

    let obj = {
      selectedKeywords
    }

    try {
      const weekSchedule = await competitorsService.searchWeeklySchedule()
      const keywords = weekSchedule.data.schedule

      if(keywords.length > 0){
        keywords[0].scheduledKeywords.forEach(element => {
          obj.selectedKeywords.push(element)
        });
      }
     
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

  deleteKeyword = async () => {
    const keyword = this.state.keywordDelete
    const domain = this.state.pathDelete
    this.setState({showModalConfirm: false})
    try {
      const result = await competitorsService.deleteUniqueKeyword(keyword, domain)
      this.allKeywordsList()
    } catch (error) {
      console.log(error)
    }
  }

  openModalConfirm = (element, competitor) => {
    this.setState({
      keywordDelete: element.Keyword,
      pathDelete: competitor.competitor,
      showModalConfirm: true
    })
  }

  backPage(){
    let buttonKeywordDisabled = this.state.buttonKeywordDisabled
    if(this.state.keyWordsSelected.length == 0 || this.state.preSelectedKeywords.length == 0) {
      buttonKeywordDisabled = true
    }
    this.setState({ review: false, buttonKeywordDisabled })

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
                  {/* <td>{e.competitors.length === 1 && <img onClick={() => this.openModalConfirm(e, e.competitors[0])} src={Trash} /> }</td> */}
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
                      <td onClick={() => this.openModalConfirm(e, c)}><img src={Trash} /></td>
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
      {this.state.showModalConfirm &&  <ModalConfirm cancel={() => this.setState({showModalConfirm: false})} confirm={() => this.deleteKeyword()} />}
    </div>
  )


  showReview = () => (
    <div className="container-flex">
      <div className="container-competitors">
        <div className="container-back">
          <button onClick={() => this.backPage()}>
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

