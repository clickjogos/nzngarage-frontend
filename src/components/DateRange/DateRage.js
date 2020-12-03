import React, { Component } from 'react'
import * as locales from 'react-date-range/dist/locale';

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import './DateRange.scss'

export default class DateRage extends Component {

  render() {
    return (
      <div className="date-range">
        <DateRangePicker
          locale={locales.ptBR}
          ranges={[this.props.selectionRange]}
          onChange={(e) => this.props.handleSelect(e)}
        />
      </div>
    )
  }
}
