export function reformatDate(dateStr) {
	let dArr = dateStr.split('-') // ex input "2010-01-18"
	return dArr[2] + '/' + dArr[1] + '/' + dArr[0].substring(2) //ex out: "18/01/10"
}

export function formatTrackingDayFilter(str) {
	str = str.split('-')
	let month = defineMonth(str[1])
	let response = str[2] + ' de ' + month + ' de ' + str[0]
	return response
}

export function defineMonth(value) {
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



export function formatWeekDayLabel(str, category) {
	if (category === 'dayPeriod') {
		switch (str) {
			case 'Manha':
				return 'Manhã'
			default:
				return str
		}
	} else if (category === 'weekDay') {
		switch (str) {
			case 'Dom':
				return 'Domingo'
			case 'Seg':
				return 'Segunda-feira'
			case 'Ter':
				return 'Terça-feira'
			case 'Qua':
				return 'Quarta-feira'
			case 'Qui':
				return 'Quinta-feira'
			case 'Sex':
				return 'Sexta-feira'
			case 'Sab':
				return 'Sábado'
		}
	}
}

export function formatDate(date) {
	var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

	if (month.length < 2) 
			month = '0' + month;
	if (day.length < 2) 
			day = '0' + day;

	return [year, month, day].join('-');
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}