import React, { Component } from 'react'

import ReactTooltip from 'react-tooltip'

import { SimpleBarChart } from '@carbon/charts-react'
import DateRange from '../../components/DateRange/DateRage'

import * as ServiceAudience from '../../providers/audience';
import * as ServiceSuggestion from '../../providers/competitors';

import * as format from '../../utils/format'

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/Loading'

import './Audience.scss'
import "@carbon/charts/styles.css";
// import "@carbon/charts/styles/styles.scss";

const IconEdit = require('../../assets/icons/icon-edit.svg')
const ButtonChevronLeft = require('../../assets/icons/icon-button-left-arrow.svg')
const ButtonChevronRight = require('../../assets/icons/icon-button-right-arrow.svg')
const Chevron = require('../../assets/icons/chevron-right.svg')
const Tooltip = require('../../assets/icons/icon-tooltip.svg')

export default class Audience extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      loading: false,
      selectionRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
      showDateRange: false,
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
      },
      tableData: [],
      backupData: [],
      chartData: [],
      options: {
        "title": "",
        "axes": {
          "left": {
            "mapsTo": "value"
          },
          "bottom": {
            "mapsTo": "group",
            "scaleType": "labels"
          }
        },
        bars: {
          width: 100,
        },
        color: {
          pairing: {
            numberOfVariants: 1,
            option: 5
          }
        },
        width: '100%',
        "height": "260px"
      },
      tags: []
    }
  }


  componentDidMount() {
    this.getAudience()
    this.biddingTags()
  }

  async getAudience() {
    this.setState({loading: true})
    try {
      let filter = {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
      const result = await ServiceAudience.getAudience(filter)
      let tableData = result.data.tableInfo
      let resultChart = result.data.chartInfo
      let chartData = []

      resultChart.forEach(element => {
        let month = format.capitalizeFirstLetter(format.defineMonth(String(element.month)))
        chartData.push({
          group: month,
          value: element.totalMonthAudience
        })
      });

      this.setState({ tableData, backupData: tableData, chartData, loading: false })

    } catch (error) {
      this.setState({ loading: false, tableData: [], chartData: [] })
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
  }


  actionPage = (status) => {
  }

  actionChangePage = (currentPage) => {
  }

  actionRows = (rows) => {
  }

  filterByTag = (event) => {
    let tag = event.target.value
    let data = this.state.backupData;

    let tableData = data.filter(e => {
      return e.tag === tag
    })

    this.setState({tableData})
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
      // this.getSuggestions()
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
    if (this.state.showDateRange) {
      this.setState({ showDateRange: false })
      let startDate = format.formatDate(this.state.selectionRange.startDate)
      let endDate = format.formatDate(this.state.selectionRange.endDate)

      this.setState({ startDate, endDate }, r => {
          this.getAudience()
      })
    } else {
      this.setState({ showDateRange: true })
    }
  }

  render() {
    return (
      <div className="refine-planning-main">
        <Sidebar></Sidebar>
        {!this.state.loading ?
          <div className="container-flex">
            <div className="container-competitors">
              <div className="audience-title">
                <span>
                  <h3>Verificar audiência</h3>
                  <h4>Nessa parte se encontram as keywords selecionadas.</h4>
                </span>
                {/* <span className="filter-title"> Visualizar: </span> */}
                <div className="audience-filters">
                  <select onChange={this.filterByTag}>
                    <option value="" selected>Caderno</option>
                    {this.state.tags.map(e => (
                      <option value={e}>{e}</option>
                    ))}
                  </select>
                  <Button callback={() => this.sendRangeDate()} title={this.state.showDateRange ? 'Enviar' : 'Filtro por Data'} style={{ width: '150px' }} />
                  {this.state.showDateRange && <DateRange handleSelect={this.handleSelect} selectionRange={this.state.selectionRange} />}
                </div>
              </div>
              <div className="container-chart-audience">
                <SimpleBarChart
                  data={this.state.chartData}
                  options={this.state.options}>
                </SimpleBarChart>
              </div>
              <table>
                <thead>
                  <tr>
                    <th >Cód. Matéria</th>
                    <th>Keyword</th>
                    <th>Caderno</th>
                    <th>Data de Publi.</th>
                    <th>Page Views</th>
                    <th>Título da Matéria</th>
                    <th>Link CMS</th>
                    <th>Média Mensal</th>
                    <th>Últimos 30 dias</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tableData.map((e, i) => (
                    <React.Fragment key={i}>
                      <tr>
                        <td>{e.articleId}</td>
                        <td>{e.Keyword}</td>
                        <td>{e.tag}</td>
                        <td>{e.publishDate}</td>
                        <td>-</td>
                        <td><p data-tip={e.title}>{(e.title).substring(0, 29)}{(e.title).length > 29 && '...'} </p> </td>
                        <a target="_blank" href={e.cmsLink}>{e.cmsLink} ↗</a>
                        <td>{e.meanAudience}</td>
                        <td>{e.last30DaysAudience}</td>
                      </tr>
                      <ReactTooltip backgroundColor={'white'} textColor={'#414141'} borderColor={'#DBE1E5'} />
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            {this.pagination()}
          </div>
          : <Loading />}
      </div>
    )
  }
}
