import React, { Component } from 'react'
import _ from 'lodash'
import ReactTooltip from 'react-tooltip'

import * as ServiceSuggestion from '../../providers/competitors'

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'
import ModalEdit from '../../components/Modal/ModalEdit'
import DateRange from '../../components/DateRange/DateRage'

import * as formart from '../../utils/format'

import './Suggestion.scss'
import { element } from 'prop-types'

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
			filterRows: false,
			tagFilter: null,
			startDate: null,
			endDate: null,
			orderArray: {
				volume: true,
				status: false,
				qtdTitle: false,
			},
			page: {
				pageNumber: 1,
				totalPages: 0,
				rowsInPage: 10,
				limit: 10,
				offset: 0,
				orderBy: 'Search Volume',
				orderType: 'desc',
			},
			selectionRange: {
				startDate: new Date(),
				endDate: new Date(),
				key: 'selection',
			},
			showDateRange: false,
			schedule: [],
		}
	}

	componentDidMount() {
		this.getSuggestions()
	}

	async getSuggestions() {
		try {
			const result = await ServiceSuggestion.searchWeeklySchedule(
				this.state.keywordFilter,
				this.state.titleFilter,
				this.state.tagFilter,
				this.state.startDate,
				this.state.endDate,
				this.state.page
			)

			let page = this.state.page
			page.pageNumber = result.data.pageNumber
			page.totalPages = result.data.totalPages
			page.rowsInPage = result.data.rowsInPage
			page.totalRows = result.data.totalRows
			page.limit = result.data.limit
			page.offset = result.data.offset

			let schedule = result.data.schedule
			let scheduledKeywords = []
			let scheduledWithFilter = []
			let filter = false
			this.setState({ filterRows: false })

			schedule.forEach((element) => {
				element.scheduledKeywords.forEach((e) => {
					e.ref = element._id
					if (e['filter']) {
						scheduledWithFilter.push(e)
						filter = true
						this.setState({ filterRows: true })
					}
					scheduledKeywords.push(e)
				})
			})


			if (filter) {
				scheduledWithFilter = this.applyOrderingToScheduledKeywords(scheduledWithFilter, this.state.orderArray)
				this.setState({ scheduledKeywords: scheduledWithFilter })
			}
			else {
				scheduledKeywords = this.applyOrderingToScheduledKeywords(scheduledKeywords, this.state.orderArray)
				this.setState({ scheduledKeywords })
			}

			this.setState({ schedule })
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
			showModalEdit: false,
		})
	}

	applyOrderingToScheduledKeywords(keywordsArray, orderingObject) {
		let fieldArray = []
		let orderArray = []

		if (orderingObject.volume != null) {
			fieldArray.push('Search Volume')
			if (orderingObject.volume) {
				orderArray.push('asc')
			}
			else {
				orderArray.push('desc')
			}
		}
		if (orderingObject.status != null) {
			fieldArray.push('status')
			if (orderingObject.status) {
				orderArray.push('asc')
			}
			else {
				orderArray.push('desc')
			}
		}

		if (orderingObject.qtdTitle != null) {
			fieldArray.push('titleLength')
			if (orderingObject.qtdTitle) {
				orderArray.push('asc')
			}
			else {
				orderArray.push('desc')
			}
		}


		return _.orderBy(keywordsArray, fieldArray, orderArray)
	}

	sendEditKeyword = async (objKeyword) => {
		let scheduledKeywords = this.state.scheduledKeywords
		let schedule = this.state.schedule

		let selectedKeywords = scheduledKeywords.map( (e, indexE) => {
			if ((e.Keyword === objKeyword.Keyword) && (e.competitor === objKeyword.competitor)) {
				scheduledKeywords[indexE] = objKeyword
			}
			return e;
		})

		const obj = {
			selectedKeywords
		}

		schedule.forEach( (actualSchedule, actualScheduleIndex) => {
			actualSchedule.scheduledKeywords.map((element, elementIndex) =>{
				scheduledKeywords.forEach((e, i) => {
					if((element.Keyword === e.Keyword) && (element.competitor === e.competitor)) {
							schedule[actualScheduleIndex].scheduledKeywords[elementIndex] = e
					}
				});
			})
			
		});

		schedule.forEach(element => {
			element.scheduledKeywords.forEach(e => {
				delete e['ref']
				delete e['filter']
			})
		})

		this.setState({ showModalEdit: false })

		try {
			let result = await ServiceSuggestion.weeklyscheduleEdit({ schedule })
			console.log(result)
			this.getSuggestions()
		} catch (error) {
			console.log(error)
		}
	}

	biddingTags = async () => {
		try {
			let result = await ServiceSuggestion.getTags(true, this.state.startDate, this.state.endDate)
			this.setState({ tags: result.data })
		} catch (error) { }
	}

	actionPage = (status) => {
		let page = this.state.page
		if (!status && page.pageNumber !== 1) page.pageNumber -= 1
		if (status && page.pageNumber < page.totalPages) page.pageNumber += 1

		if (status) {
			page.offset = page.limit
			page.limit += page.rowsInPage
		} else if (!status) {
			page.limit = page.offset
			page.offset -= page.rowsInPage
		}

		this.setState({ page }, (r) => {
			this.getSuggestions()
		})
	}

	actionChangePage = (pageNumber) => {
		let page = this.state.page
		if (pageNumber > 0 && pageNumber <= page.totalPages) {
			if (pageNumber > page.pageNumber) {
				page.offset = page.limit
				page.limit += page.rowsInPage
			} else {
				page.limit = page.offset
				page.offset -= page.rowsInPage
			}
			page.pageNumber = pageNumber

			this.setState({ page }, (r) => {
				this.getSuggestions()
			})
		}
	}

	actionRows = (rows) => {
		let page = this.state.page
		if (rows <= 50 && rows >= 10) { // TODO: trocar o mínimo por 10
			page.limit = rows
			this.setState({ page }, (r) => {
				this.getSuggestions()
			})
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
						<input onChange={(e) => this.actionChangePage(e.target.value)} value={this.state.page.pageNumber} type="number" />
						<p>de {this.state.page.totalPages}</p>
					</div>
					<div className="pagination-input">
						<p>Exibindo</p>
						<input onChange={(e) => this.actionRows(e.target.value)} value={this.state.page.rowsInPage} type="number" />
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
		let page = this.state.page
		page.pageNumber = 1
		page.totalPages = 0
		page.rowsInPage = 10
		page.limit = 10
		page.offset = 0
		if (e.key === 'Enter') {
			this.getSuggestions()
		}
	}
	handleSelect = (ranges) => {
		let selectionRange = {
			startDate: ranges.selection.startDate,
			endDate: ranges.selection.endDate,
			key: 'selection',
		}
		this.setState({ selectionRange })
	}

	sendRangeDate = () => {
		if (this.state.showDateRange) {
			this.setState({ showDateRange: false })
			let startDate = formart.formatDate(this.state.selectionRange.startDate)
			let endDate = formart.formatDate(this.state.selectionRange.endDate)

			this.setState({ startDate, endDate }, (r) => {
				console.log(this.state)
				this.getSuggestions()
			})
		} else {
			this.setState({ showDateRange: true })
		}
	}

	handleTag = (e) => {
		this.setState({ tagFilter: e.target.value }, (r) => {
			this.getSuggestions()
		})
	}
	orderArrayBy(key) {
		// let keyWordsList = this.state.keyWordsList
		console.log('orderBy', key)
		let orderArray = this.state.orderArray
		let page = this.state.page
		let status = true

		if (key === 'Search Volume') {
			// orderArray.volume = !orderArray.volume
			if (orderArray.volume == true) orderArray.volume = !orderArray.volume;
			else {
				if (orderArray.volume == false) orderArray.volume = null;
				else {
					orderArray.volume = true;
				}
			}
			status = !orderArray.volume
			page.orderBy = 'Search Volume'
		}
		if (key === 'status') {
			// orderArray.status = !orderArray.status
			if (orderArray.status == true) orderArray.status = !orderArray.status;
			else {
				if (orderArray.status == false) orderArray.status = null;
				else {
					orderArray.status = true;
				}
			}
			status = !orderArray.status
			page.orderBy = 'status'
		}
		if (key === 'titleLength') {
			// orderArray.qtdTitle = !orderArray.qtdTitle
			if (orderArray.qtdTitle == true) orderArray.qtdTitle = !orderArray.qtdTitle;
			else {
				if (orderArray.qtdTitle == false) orderArray.qtdTitle = null;
				else {
					orderArray.qtdTitle = true;
				}
			}
			status = !orderArray.qtdTitle
			page.orderBy = 'titleLength'
		}

		if (status) {
			page.orderType = 'asc'
		} else {
			page.orderType = 'desc'
		}

		this.setState({ orderArray, page }, (r) => {
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
								{/* {this.state.filterRows ? (
									<></>
								) : ( */}
								<select onChange={this.handleTag}>
									<option value="" selected>
										Caderno
										</option>
									{this.state.tags.map((e) => (
										<option value={e}>{e}</option>
									))}
								</select>
								{/* // )} */}
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
									<th>Caderno</th>
									<th>Keyword</th>
									<th onClick={() => this.orderArrayBy('Search Volume')}>
										Volume de Busca
										<div style={this.state.orderArray.volume != null ? null : { display: 'none' }}>
											<img style={this.state.orderArray.volume ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
										</div>
										<p style={this.state.orderArray.volume == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>
									</th>
									<th onClick={() => this.orderArrayBy('status')}>
										Status
										<div style={this.state.orderArray.status != null ? null : { display: 'none' }}>
											<img style={this.state.orderArray.status ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
										</div>
										<p style={this.state.orderArray.status == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>

									</th>
									<th>Título Sugerido</th>
									<th onClick={() => this.orderArrayBy('titleLength')}>
										Caracteres Título
										<div style={this.state.orderArray.qtdTitle != null ? null : { display: 'none' }}>

											<img style={this.state.orderArray.qtdTitle ? { transform: 'rotate(180deg)' } : null} className="chevron" src={Chevron} />
										</div>
										<p style={this.state.orderArray.qtdTitle == null ? { color: '#c1cad2' } : { display: 'none' }} >-</p>

									</th>
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
											<td>{e.status ? e.status : '-'}</td>
											<td>
												<p data-tip={e.title}>
													{e.title.substring(0, 29)}
													{e.title.length > 29 && '...'}{' '}
												</p>{' '}
											</td>
											<td>{e.title.length}</td>
											<td>
												<a target="_blank" href={e.competitorInfo.Url}>
													{e.competitorInfo.Url} ↗
												</a>
											</td>
											<td>
												<img onClick={() => this.openModalEdit(e)} className="edit-icon" src={IconEdit} />
											</td>
										</tr>
										<ReactTooltip backgroundColor={'white'} textColor={'#414141'} borderColor={'#DBE1E5'} />
									</React.Fragment>
								))}
							</tbody>
						</table>
					</div>

					{this.state.filterRows ? <></> : this.pagination()}
				</div>
				{this.state.showModalEdit && <ModalEdit callback={this.sendEditKeyword} data={this.state.dataModalEdit} close={() => this.closeModalEdit()} />}
			</div>
		)
	}
}
