import React, { Component } from 'react'

import ReactTooltip from 'react-tooltip'

import * as ServiceSuggestion from '../../providers/competitors';

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'
import ModalEdit from '../../components/Modal/ModalEdit'
import { SimpleBarChart } from "@carbon/charts-react";
import './Audience.scss'

const IconEdit = require('../../assets/icons/icon-edit.svg')
const ButtonChevronLeft = require('../../assets/icons/icon-button-left-arrow.svg')
const ButtonChevronRight = require('../../assets/icons/icon-button-right-arrow.svg')
const Chevron = require('../../assets/icons/chevron-right.svg')
const Tooltip = require('../../assets/icons/icon-tooltip.svg')

export default class Audience extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scheduledKeywords: [],
      tags: [],
      showModalEdit: false,
      dataModalEdit: null,
      keywordFilter: null,
      titleFilter: null,
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
      }
    }
  }
  

  componentDidMount() {
    this.getSuggestions()
  }
  async getSuggestions() {
    try {
      const result = await ServiceSuggestion.searchWeeklySchedule(this.state.keywordFilter, this.state.titleFilter)
      let schedule = result.data.schedule
      let scheduledKeywords = []
      let scheduledWithFilter = []
      let filter = false

      schedule.forEach(element => {
        element.scheduledKeywords.forEach(e => {
          if(e['filter']){
            scheduledWithFilter.push(e)
            filter = true
          }
          scheduledKeywords.push(e)
        });
      });
      if(filter) this.setState({ scheduledKeywords:scheduledWithFilter })
      else this.setState({ scheduledKeywords })
      this.biddingTags()
      this.setState({ scheduledKeywords })
    } catch (error) {
      console.log(error)
    }
  }

  openModalEdit(dataModalEdit) {
    console.log(dataModalEdit)
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

    let selectedKeywords = scheduledKeywords.map(e => {
      if (e._id === objKeyword._id) {
        e = objKeyword
      }

      return e;
    })

    const obj = {
      selectedKeywords
    }

    this.setState({ showModalEdit: false })

    try {
      let result = await ServiceSuggestion.weeklyschedule(obj)
      console.log(result)
      this.getSuggestions()
    } catch (error) {
      console.log(error)
    }

  }

  biddingTags = async () => {
    try {
      let result = await ServiceSuggestion.getTags(true)
      this.setState({tags: result.data})
    } catch (error) {
      
    }
  }

  orderArrayBy(key) {
  }


  actionPage = (status) => {
  }

  actionChangePage = (currentPage) => {
  }

  actionRows = (rows) => {
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
  render() {
    return (
        <div className="refine-planning-main">
            <Sidebar></Sidebar>
            <div className="container-flex">
            <div className="container-competitors">
                <div className="audience-title">
                <span>
                    <h3>Verificar audiência</h3>
                    <h4>Nessa parte se encontram as keywords selecionadas.</h4>
                </span>
                <span className="filter-title"> Visualizar: </span>
                <div className="audience-filters">
                    <select>
                    <option value="" selected>Caderno</option>
                    {this.state.tags.map(e => (
                        <option value={e}>{e}</option>
                    ))}
                    </select>
                    <Button title="Semana" style={{ width: '99px' }} />
                    <Button title="Mês" style={{ width: '99px' }} />
                </div>
                </div>
                <table>
                <thead>
                    <tr>
                    <th >Caderno</th>
                    <th>Keyword</th>
                    <th onClick={() => this.orderArrayBy('Search Volume')}>Volume de Busca <img style={this.state.orderArray.volume ? {transform: 'rotate(180deg)'} : null} className="chevron" src={Chevron}/></th>
                    <th onClick={() => this.orderArrayBy('Status')}>Status <img style={this.state.orderArray.status ? {transform: 'rotate(180deg)'} : null} className="chevron" src={Chevron}/></th>
                    <th >Título Sugerido</th>
                    <th onClick={() => this.orderArrayBy('titleLength')}>Qtd. Título <img style={this.state.orderArray.qtdTitle ? {transform: 'rotate(180deg)'} : null} className="chevron" src={Chevron}/></th>
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
