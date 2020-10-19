import React, { Component } from 'react'
import Loading from '../../components/Loading/Loading'
import Sidebar from '../../components/Sidebar/Sidebar'
import Cards from '../../components/Cards/Cards'
import './TrackingPlanning.scss'

class TrackingPlanning extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }

    render() {
        return (
            <div className="main">
                <Sidebar />
                {this.state.show ? (
                    <>
                        <div className="container-flex-tracking">
                            <div className="container-block-tracking">
                                <div className="container-tracking">
                                    <div className="head-tracking">
                                        <div className="title-tracking">
                                            <h3 style={{ fontSize: "28px" }}>Visão Geral do Planejamento</h3>
                                            <h4 style={{ fontSize: "18px" }}>Você pode refinar a sugestão de planejamento</h4>
                                        </div>
                                        <div className="filters-tracking">

                                        </div>
                                    </div>
                                    <Cards title="Matérias" realPoints="90" estimedPoints="320"></Cards>
                                </div>

                            </div>
                        </div>
                    </>
                ) : (
                        <Loading />
                    )}
            </div>
        )
    }
}

export default TrackingPlanning