import React, { Component } from 'react'

import ReactTooltip from 'react-tooltip'

import * as ServiceSuggestion from '../../providers/competitors';

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'
import ModalEdit from '../../components/Modal/ModalEdit'
import DateRange from '../../components/DateRange/DateRage'

import * as formart from '../../utils/format'

import './Suggestion.scss'

const IconEdit = require('../../assets/icons/icon-edit.svg')
const ButtonChevronLeft = require('../../assets/icons/icon-button-left-arrow.svg')
const ButtonChevronRight = require('../../assets/icons/icon-button-right-arrow.svg')
const Chevron = require('../../assets/icons/chevron-right.svg')
const Tooltip = require('../../assets/icons/icon-tooltip.svg')

export default class Suggestion extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scheduledKeywords: [],
      tags: [],
      showModalEdit: false,
      dataModalEdit: null,
      keywordFilter: null,
      titleFilter: null,
      tagFilter: null,
      startDate: null,
      endDate: null,
      orderArray: {
        volume: true,
        status: false,
        qtdTitle: false
      },
      page: {
        currentPage: 1,
        totalPages: 0,
        resultsPerPage: 10,
        orderBy: 'Search Volume',
        orderType: 'desc',
      },
      selectionRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
      showDateRange: false,
      schedule: []
    }
  }


  componentDidMount() {
    this.getSuggestions()
  }

  async getSuggestions() {
    console.log(this.state.tagFilter)
    try {
      const result = await ServiceSuggestion.searchWeeklySchedule(
        this.state.keywordFilter, 
        this.state.titleFilter, 
        this.state.tagFilter, 
        this.state.startDate,
        this.state.endDate)

      let schedule = result.data.schedule
      let scheduledKeywords = []
      let scheduledWithFilter = []
      let filter = false
       
      schedule.forEach(element => {
        element.scheduledKeywords.forEach(e => {
          e.ref = element._id
          if (e['filter']) {
            scheduledWithFilter.push(e)
            filter = true
          }
          scheduledKeywords.push(e)
        });
      });
      if (filter) this.setState({ scheduledKeywords: scheduledWithFilter })
      else this.setState({ scheduledKeywords })

      this.setState({schedule})
      this.biddingTags()
    } catch (error) {
      console.log(error)
    }
  }

  openModalEdit(dataModalEdit) {
    this.setState({ dataModalEdit, showModalEdit: true })
  }

  closeModalEdit() {
    this.setState({
      dataModalEdit: null,
      showModalEdit: false
    })
  }

  sendEditKeyword = async (objKeyword) => {
    let scheduledKeywords = this.state.scheduledKeywords
    let schedule = this.state.schedule

    let selectedKeywords = scheduledKeywords.map(e => {
      if (e._id === objKeyword._id) {
        e = objKeyword
      }

      return e;
    })

    const obj = {
      selectedKeywords
    }

    schedule.forEach(element => {
      scheduledKeywords.forEach((e, i) => {
        if(element._id === e.ref) {
          if(e._id === element.scheduledKeywords[i]){
            element.scheduledKeywords[i] = e
          }
        }
      });
    });

    schedule.forEach(element => {
      element.scheduledKeywords.forEach(e=>{
        delete e['ref']
      })
    })

    this.setState({ showModalEdit: false })

    try {
      let result = await ServiceSuggestion.weeklyscheduleEdit({schedule})
      console.log(result)
      this.getSuggestions()
    } catch (error) {
      console.log(error)
    }

  }

  biddingTags = async () => {
    try {
      let result = await ServiceSuggestion.getTags(true)
      this.setState({ tags: result.data })
    } catch (error) {

    }
  }

  orderArrayBy(key) {
    // let keyWordsList = this.state.keyWordsList
    // let orderArray = this.state.orderArray
    // let page = this.state.page
    // let status = true

    // if(key === 'Search Volume'){
    //   orderArray.volume = !orderArray.volume
    //   status = !orderArray.volume
    //   page.orderBy = 'Search Volume'
    // }
    // if(key === 'competitorPosition'){
    //   orderArray.pos = !orderArray.pos
    //   status = !orderArray.pos
    //   page.orderBy = 'competitorPosition'
    // }
    // if(key === 'nznPosition'){
    //   orderArray.posNzn = !orderArray.posNzn
    //   status = !orderArray.posNzn
    //   page.orderBy = 'nznPosition'
    // }

    // if(status) {
    //   page.orderType = 'asc'
    // } else {
    //   page.orderType = 'desc'
    // }

    // this.setState({ orderArray, page }, r=> {
    //   this.allKeywordsList()
    // })
  }


  actionPage = (status) => {
    // let page = this.state.page
    // if(!status && page.currentPage !== 1) page.currentPage -= 1
    // if(status && page.currentPage < page.totalPages) page.currentPage +=1
    // this.setState({page}, r=> {
    //   this.allKeywordsList()
    // })
  }

  actionChangePage = (currentPage) => {
    // let page = this.state.page
    // if(currentPage > 0 && currentPage <= page.totalPages){
    //   page.currentPage = currentPage
    //   this.setState({page}, r=> {
    //     this.allKeywordsList()
    //   })
    // }
  }

  actionRows = (rows) => {
    // let page = this.state.page
    // if(rows <= 50 && rows >= 10){
    //   page.resultsPerPage = rows 
    //   this.setState({page}, r=> {
    //     this.allKeywordsList()
    //   })
    // }
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
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.getSuggestions()
    }
  }
  handleSelect = (ranges) => {
    let selectionRange = {
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: 'selection'
    }
    this.setState({ selectionRange })
  }

  sendRangeDate = () => {
    if(this.state.showDateRange){
      this.setState({showDateRange: false})
      let startDate = formart.formatDate(this.state.selectionRange.startDate)
      let endDate = formart.formatDate(this.state.selectionRange.endDate)

      this.setState({startDate, endDate}, r=> {
        this.getSuggestions()
      })
    } else {
      this.setState({showDateRange: true})
    }
  }

  handleTag = (e) => {
    this.setState({tagFilter: e.target.value}, r=> {
      this.getSuggestions()
    })
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
                <select onChange={this.handleTag}>
                  <option value="" selected disabled>Caderno</option>
                  {this.state.tags.map(e => (
                    <option value={e}>{e}</option>
                  ))}
                </select>
                <Button callback={() => this.sendRangeDate()} title={this.state.showDateRange ? 'Enviar' : 'Filtro por Data'} style={{ width: '150px' }} />
                {this.state.showDateRange && <DateRange handleSelect={this.handleSelect} selectionRange={this.state.selectionRange} />}
              </div>
            </div>
            <div className="suggestion-container-search">
              <div className="search">
                <span>Y</span>
                <input onKeyDown={this._handleKeyDown} onChange={(e) => this.setState({ keywordFilter: e.target.value })} placeholder="Buscar por Keyword" type="text" />
              </div>
              <div className="search title">
                <span>Y</span>
                <input onKeyDown={this._handleKeyDown} onChange={(e) => this.setState({ titleFilter: e.target.value })} placeholder="Buscar por Título da Página" type="text" />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th >Caderno</th>
                  <th>Keyword</th>
                  <th onClick={() => this.orderArrayBy('Search Volume')}>Volume de Busca <img style={this.state.orderArray.volume ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} /></th>
                  <th onClick={() => this.orderArrayBy('Status')}>Status <img style={this.state.orderArray.status ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} /></th>
                  <th >Título Sugerido</th>
                  <th onClick={() => this.orderArrayBy('titleLength')}>Qtd. Título <img style={this.state.orderArray.qtdTitle ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} /></th>
                  <th>URL Concorrente</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {this.state.scheduledKeywords.map((e, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{e.tag === '' ? '-' : e.tag}</td>
                      <td>{e.Keyword}</td>
                      <td>{e['Search Volume']}</td>
                      <td>{e.status ? e.status : "-"}</td>
                      <td><p data-tip={e.title}>{(e.title).substring(0, 29)}{(e.title).length > 29 && '...'} </p> </td>
                      <td>{e.title.length}</td>
                      <td><a target="_blank" href={e.competitorInfo.Url}>{e.competitorInfo.Url} ↗</a></td>
                      <td><img onClick={() => this.openModalEdit(e)} className="edit-icon" src={IconEdit} /></td>
                    </tr>
                    <ReactTooltip backgroundColor={'white'} textColor={'#414141'} borderColor={'#DBE1E5'} />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {this.pagination()}
        </div>
        {this.state.showModalEdit && <ModalEdit callback={this.sendEditKeyword} data={this.state.dataModalEdit} close={() => this.closeModalEdit()} />}
      </div>
    )
  }
}
