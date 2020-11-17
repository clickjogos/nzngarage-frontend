import React, { Component } from 'react'

import Sidebar from '../../components/Sidebar/Sidebar'
import Button from '../../components/Button/Button'
import InputLabelPlanning from '../../components/InputLabel/InputLabelPlanning'
import Loading from '../../components/Loading/Loading'

import * as competitorsService from '../../providers/competitors'

import './Competitors.scss'

export default class Competitors extends Component {
  constructor(props) {
    super(props)

    this.state = {
      competitorUrl: '',
      loading: false
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({loading: true})

    try {
      const result = await competitorsService.getKeyWordsList(this.state.competitorUrl)
      console.log(result.data)
      this.setState({loading: false})
    } catch (error) {
      this.setState({loading: false})
      console.log(error)
    }

  }

  render() {
    return (
      <div className="refine-planning-main">
        <Sidebar></Sidebar>
        {!this.state.loading ?
          <div className="container-flex">
            <div className="container-competitors">
              <h3 style={{ fontSize: '28px' }}>Selecione o Concorrente</h3>
              <form onSubmit={this.handleSubmit}>
                <InputLabelPlanning
                  callback={(e) => this.setState({ competitorUrl: e })}
                  value={this.state.competitorUrl}
                  label="Selecione a URL do Concorrente"
                  placeholder="http://..." />

                <div className="container-step">
                  <Button callback={() => this.handleSubmit} title="Visualizar a listagem de Keywords >" />
                </div>
              </form>

            </div>
          </div>
          : 
          <Loading />
        }
      </div>
    )
  }
}
