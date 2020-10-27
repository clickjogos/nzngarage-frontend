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
	switch (value) {
		case '01':
			return 'janeiro'
		case '02':
			return 'fevereiro'
		case '03':
			return 'março'
		case '04':
			return 'abril'
		case '05':
			return 'maio'
		case '06':
			return 'junho'
		case '07':
			return 'julho'
		case '08':
			return 'agosto'
		case '09':
			return 'setembro'
		case '10':
			return 'outubro'
		case '11':
			return 'novembro'
		case '12':
			return 'dezembro'
	}
}

export function formatWeekDay(str) {
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