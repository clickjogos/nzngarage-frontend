import React, { Component } from 'react'
import _ from 'lodash'

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
      tagFilter: null,
      orderArray: {
        codMat: null,
        keyword: null,
        caderno: null,
        datePub: null,
        pageViews: null,
        title: null,
        monthAvg: null,
        lastMonth: null

      },
      page: {
        currentPage: 1,
        totalPages: 0,
        resultsPerPage: 10,
        orderBy: 'Search Volume',
        orderType: 'desc',
        slice: {
          first: 0,
          last: 10
        }
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

  async getAudience(reset) {
    this.setState({ loading: true })
    try {
      let filter = {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
      if(this.state.tagFilter)  filter['tag'] = this.state.tagFilter

      const result = await ServiceAudience.getAudience(filter)
      let tableData = result.data.tableInfo
      let resultChart = result.data.chartInfo
      let chartData = []

      resultChart = _.orderBy(resultChart, ['month'], ['asc'])
      resultChart.forEach(element => {

        // console.log(element)
        let monthString = this.defineMonth(element.month.toString())
        // console.log('monthString', monthString)
        let month = this.capitalizeFirstLetter(monthString)
        // console.log('month', month)
        chartData.push({
          group: month,
          value: element.totalMonthAudience
        })
      });


      tableData = this.applyOrderingToTableData(tableData, this.state.orderArray)
      this.setState({ tableData, backupData: tableData, chartData, loading: false }, r=> {
        this.callPagination()
      })
      
    } catch (error) {
      this.setState({ loading: false, tableData: [], chartData: [] })
    }
  }



  applyOrderingToTableData(tableData, orderingObject) {
    let fieldArray = []
    let orderArray = []

    let fieldsToOrder = Object.keys(orderingObject)

    fieldsToOrder.forEach((field) => {
      let fieldValue = orderingObject[field]
      if (fieldValue != null) {

        if (field == 'codMat') fieldArray.push('articleId')
        if (field == 'keyword') fieldArray.push('keyword')
        if (field == 'caderno') fieldArray.push('tag')
        if (field == 'datePub') fieldArray.push('publishDate')
        if (field == 'pageViews') fieldArray.push('totalAudience')
        if (field == 'title') fieldArray.push('title')
        if (field == 'monthAvg') fieldArray.push('meanAudience')
        if (field == 'lastMonth') fieldArray.push('last30DaysAudience')

        if (fieldValue) {
          orderArray.push('asc')
        }
        else {
          orderArray.push('desc')
        }
      }
    })
    
    return _.orderBy(tableData, fieldArray, orderArray)
  }

  defineMonth(value) {
    switch (value.toString()) {
      case '01':
        return 'janeiro'
      case '1':
        return 'janeiro'
      case '02':
        return 'fevereiro'
      case '2':
        return 'fevereiro'
      case '03':
        return 'março'
      case '3':
        return 'março'
      case '04':
        return 'abril'
      case '4':
        return 'abril'
      case '05':
        return 'maio'
      case '5':
        return 'maio'
      case '06':
        return 'junho'
      case '6':
        return 'junho'
      case '07':
        return 'julho'
      case '7':
        return 'julho'
      case '08':
        return 'agosto'
      case '8':
        return 'agosto'
      case '09':
        return 'setembro'
      case '9':
        return 'setembro'
      case '10':
        return 'outubro'
      case '11':
        return 'novembro'
      case '12':
        return 'dezembro'
    }
  }

  capitalizeFirstLetter(string) {
    
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  biddingTags = async () => {
    try {
      let result = await ServiceSuggestion.getTags(true, null, null, true)
      this.setState({ tags: result.data })
    } catch (error) {

    }
  }

  callPagination(){
    let array = this.state.tableData;
    let page = this.state.page
    let totalPages = Number((array.length/page.resultsPerPage).toFixed())

    if(array.length/page.resultsPerPage - totalPages !== 0 && array.length/page.resultsPerPage - totalPages > 0){
      totalPages += 1
    }

    if(totalPages === 0) totalPages = 1;

    page.totalPages = totalPages;
    page.currentPage = 1;
    
    // console.log(totalPages, array.length/10)
    this.setState({page})
  }

  actionRows(value){
    let array = this.state.chartData;
    let page = this.state.page; 
    let totalPages = (array.length/value).toFixed()

    page.totalPages = totalPages
    this.setState({page})
  }

  actionRows = (value) => {
    let page = this.state.page
    page.resultsPerPage = value 
    page.slice.first = 0;
    page.slice.last = value

    this.setState({page}, r=> {
      this.callPagination()
    })
  }

  actionPage(status){
    let page = this.state.page
    if(status){
      if(page.currentPage < page.totalPages){
        page.currentPage += 1

        let first = page.slice.last
        let last = (Number(page.slice.last) + Number(page.resultsPerPage))

        page.slice.first = first;
        page.slice.last = last;

        this.setState({page})

      }
    } else {
      if(page.currentPage > 1 ){
        page.currentPage -=1

        let first = Number(page.slice.first) - Number(page.resultsPerPage) +1 // 10 - 10
        let last = page.slice.first

        page.slice.first = first;
        page.slice.last = last;

        this.setState({page})

      }
    }
    this.setState({page})
  }

  filterByTag = (event) => {
    let tagToFilter = event.target.value
    let data = this.state.backupData;

    let tagFilter = this.state.tagFilter

    if(event.target.value == "") {
      tagFilter = null
    } else {
      tagFilter = tagToFilter
    }

   
    this.setState({ tagFilter }, r=> {
      this.getAudience()
    })
  }

  actionChangePage = (currentPage) => {
		let page = this.state.page
		if (currentPage > 0 && currentPage <= page.totalPages) {
      // console.log(currentPage)
      if(page.currentPage > currentPage) {
        page.currentPage = currentPage

        let first = Number(page.slice.first) - Number(page.resultsPerPage) +1 // 10 - 10
        let last = page.slice.first

        page.slice.first = first;
        page.slice.last = last;

        this.setState({page})
      } else {
        page.currentPage = currentPage 

        let first = page.slice.last
        let last = (Number(page.slice.last) + Number(page.resultsPerPage))

        page.slice.first = first;
        page.slice.last = last;

        this.setState({page})
      } 

      
		}
	}


  pagination = () => {
    return (
      <div className="container-pagination">
        <div onClick={() => this.actionPage(false)} className="container-pagination-button">
          <img alt={'button'} src={ButtonChevronLeft} />
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
          <img alt={'button'} src={ButtonChevronRight} />
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

  orderArrayBy(key) {
    // let keyWordsList = this.state.keyWordsList
    let orderArray = this.state.orderArray
    let page = this.state.page
    let status = true
    if (key === 'codMat') {
      orderArray.codMat = this.toggleOrderValue(orderArray.codMat)
    }
    if (key === 'keyword') {
      orderArray.keyword = this.toggleOrderValue(orderArray.keyword)
    }
    if (key === 'caderno') {
      orderArray.caderno = this.toggleOrderValue(orderArray.caderno)
    }

    if (key === 'datePub') {
      orderArray.datePub = this.toggleOrderValue(orderArray.datePub)
    }
    if (key === 'pageViews') {
      orderArray.pageViews = this.toggleOrderValue(orderArray.pageViews)
    }
    if (key === 'title') {
      orderArray.title = this.toggleOrderValue(orderArray.title)
    }
    if (key === 'monthAvg') {
      orderArray.monthAvg = this.toggleOrderValue(orderArray.monthAvg)
    }
    if (key === 'lastMonth') {
      orderArray.lastMonth = this.toggleOrderValue(orderArray.lastMonth)
    }

    this.setState({ orderArray, page }, (r) => {
      let newTableData = this.applyOrderingToTableData(this.state.tableData, this.state.orderArray)
        this.setState({ tableData: newTableData, backupData: newTableData, loading: false })        
    })
  }

  toggleOrderValue(objectValue) {
    if (objectValue == true) return !objectValue;
    else {
      if (objectValue == false) return null;
      else {
        return true;
      }
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
              {!this.state.loading ?
              (<>
              <div className="container-chart-audience">
                <SimpleBarChart
                  data={this.state.chartData}
                  options={this.state.options}>
                </SimpleBarChart>
              </div>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => this.orderArrayBy('codMat')}>Cód. Matéria
                    <div style={this.state.orderArray.codMat != null ? null : { display: 'none' }}>
                        <img style={this.state.orderArray.codMat ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
                      </div>
                      <p style={this.state.orderArray.codMat == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>
                    </th>
                    <th onClick={() => this.orderArrayBy('keyword')}>Keyword
                    <div style={this.state.orderArray.keyword != null ? null : { display: 'none' }}>
                        <img style={this.state.orderArray.keyword ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
                      </div>
                      <p style={this.state.orderArray.keyword == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>
                    </th>
                    <th onClick={() => this.orderArrayBy('caderno')}>Caderno
                      <div style={this.state.orderArray.caderno != null ? null : { display: 'none' }}>
                        <img style={this.state.orderArray.caderno ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
                      </div>
                      <p style={this.state.orderArray.caderno == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>
                    </th>
                    <th onClick={() => this.orderArrayBy('datePub')}>Data de Publi.
                    <div style={this.state.orderArray.datePub != null ? null : { display: 'none' }}>
                        <img style={this.state.orderArray.datePub ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
                      </div>
                      <p style={this.state.orderArray.datePub == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>
                    </th>
                    <th onClick={() => this.orderArrayBy('pageViews')}>Page Views
                    <div style={this.state.orderArray.pageViews != null ? null : { display: 'none' }}>
                        <img style={this.state.orderArray.pageViews ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
                      </div>
                      <p style={this.state.orderArray.pageViews == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>
                    </th>
                    <th onClick={() => this.orderArrayBy('title')}>Título da Matéria
                    <div style={this.state.orderArray.title != null ? null : { display: 'none' }}>
                        <img style={this.state.orderArray.title ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
                      </div>
                      <p style={this.state.orderArray.title == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>
                    </th>
                    <th>Link CMS</th>
                    <th onClick={() => this.orderArrayBy('monthAvg')}>Média Mensal
                    <div style={this.state.orderArray.monthAvg != null ? null : { display: 'none' }}>
                        <img style={this.state.orderArray.monthAvg ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
                      </div>
                      <p style={this.state.orderArray.monthAvg == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>
                    </th>
                    <th onClick={() => this.orderArrayBy('lastMonth')}>Últimos 30 dias
                    <div style={this.state.orderArray.lastMonth != null ? null : { display: 'none' }}>
                        <img style={this.state.orderArray.lastMonth ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
                      </div>
                      <p style={this.state.orderArray.lastMonth == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(this.state.tableData.slice(this.state.page.slice.first,this.state.page.slice.last)).map((e, i) => (
                    <React.Fragment key={i}>
                      <tr>
                        <td>{e.articleId}</td>
                        <td>{e.Keyword}</td>
                        <td>{e.tag}</td>
                        <td>{e.publishDate}</td>
                        <td>{e.totalAudience}</td>
                        <td><p data-tip={e.title}>{(e.title).substring(0, 29)}{(e.title).length > 29 && '...'} </p> </td>
                        <td><a target="_blank" href={e.cmsLink}>{e.cmsLink} ↗</a></td>
                        <td>{e.meanAudience}</td>
                        <td>{e.last30DaysAudience}</td>
                      </tr>
                      <ReactTooltip backgroundColor={'white'} textColor={'#414141'} borderColor={'#DBE1E5'} />
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </>)
          : <></>}
            </div> 
            
            {!this.state.loading ? this.pagination() : <></>} 
          </div>
      </div>
    )
  }
}