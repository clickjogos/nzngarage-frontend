import React, { Component } from "react";
import "./PlanningList.scss";
import PlanningButton from "../../assets/images/new-planning-button.svg";
import Activated from "../../assets/images/icon-active.svg";
import Deactivated from "../../assets/images/icon-desactive.svg";
import Sidebar from "../../components/Sidebar/Sidebar";
import MoreOptions from "../../assets/images/icon-more-options.svg";
import history from "../App/history";
import * as format from "../../utils/format";
import * as planning from "../../providers/planning";
import * as data from "../../providers/mocks/data.json";

import { findAllInRenderedTree } from "react-dom/test-utils";

export default class PlanningList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      edit: false,
    };
    console.log(">>> props");
    console.log(this.props);
    console.log(">>> state");
    console.log(this.state);
    console.log(data, "JSON");
  }

  getEvent = (e, params) => {
      console.log("evento", e.target)
      console.log("planning", planning)

	
		this.setState({ show: false })
		let obj = {
			id: params['_id']
	
		}
		planning
			.getPlanning(obj)
			.then((response) => {

                this.setState({ edit: true })
                history.push('/createPlanning', { edit: true, planning: response.data})
			})
			.catch((error) => {
				alert(error)
			})
	

  
    // if (e.target) {
    //   this.setState({ edit: true });
    // //   history.push("/createPlanning"), this.state;
    // history.push('/createPlanning', { edit: true, planning: planning})

    // } 
  };

  componentDidMount() {
    this.allRequest();
  }

  async allRequest() {
    try {
      const planningList = await planning.listPlannings();

      this.setState({
        planningList: planningList.data.data,
        show: true,
        edit: true,
      });
    } catch (error) {}
    console.log("planniung");
    console.log(this.state.planningList);
  }

  formatDate(date) {
    return <>{format.reformatDate(date)} </>;
  }

  render() {
    return (
      <div className="main">
        <Sidebar />
        {this.state.show ? (
          <>
            <div className="title">
              <h1>Planejamentos</h1>
              <span className="planning-count">
                {" "}
                {this.state.planningList.length}{" "}
              </span>
            </div>
            <div className="new-planning">
              <button
                className="container-image"
                onClick={() => history.push("/createPlanning")}
              >
                <img src={PlanningButton} />
              </button>
              {/* <div className="container-image">
                                <img src={PlanningButton} alt="" />
                            </div> */}
              <h2 className="planning-title">Criar novo planejamento</h2>
            </div>
            
            <div className="theme-list">
              <ul>
                {this.state.planningList.map((planning) => {
                  if (planning.status) {
                    return (
                      <li 
                      onClick={(e) => this.getEvent(e, planning)}
                        key={planning["_id"]}
                        className="theme-list-activated"
                      >
                        <span className="dates">
                          {this.formatDate(planning.startDate)} até{" "}
                          {this.formatDate(planning.endDate)}
                        </span>
                        <h2 className="card-name">{planning.planningName}</h2>
                        <div className="status-option">
                          <div className="status">
                            <img src={Activated} alt="status image" />
                            <span>Ativado</span>
                          </div>
                          <div className="option">
                            <img src={MoreOptions} alt="" />
                          </div>
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={planning["_id"]}
                        className="theme-list-deactivated"
                        onClick={(e) => this.getEvent(e, planning)}
                      >
                        <span className="dates">
                          {this.formatDate(planning.startDate)} até{" "}
                          {this.formatDate(planning.endDate)}
                        </span>
                        <h2 className="card-name">{planning.planningName}</h2>
                        <div className="status-option">
                          <div className="status">
                            <img src={Deactivated} alt="status image" />
                            <span>Desativado</span>
                          </div>
                          <div className="option">
                            <img src={MoreOptions} alt="e" />
                          </div>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </>
        ) : (
          <h1> Carregando... </h1>
        )}
      </div>
    );
  }
}
