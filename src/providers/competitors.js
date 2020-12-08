import axiosProvider from './config/backend2';

export function getKeyWordsList(params) {
    return axiosProvider.get(`/keyWords/getKeyWordsList/`,{
        params
    });
}

export function deleteUniqueKeyword(keyword, domain) {
    return axiosProvider.post(`/keyWords/disqualify?keyword=${keyword}&domain=${domain}`);
}

export function weeklyschedule(body) {
    return axiosProvider.post('/keyWords/weeklyschedule', body)
}

export function searchWeeklySchedule(keywordFilter, titleFilter, tagFilter, startDate, endDate, params) {
    var URL = `/keyWords/weeklyschedule?`
    if (keywordFilter) URL += `keywordFilter=${keywordFilter}`
    if (titleFilter) URL += `&titleFilter=${titleFilter}`
    if (tagFilter) URL += `&tag=${tagFilter}`
    if (startDate) URL += `&startDate=${startDate}`
    if (endDate) URL += `&endDate=${endDate}`

    return axiosProvider.get(URL, {params})
}

export function weeklyscheduleEdit(body) {
    return axiosProvider.put('/keyWords/weeklyschedule', body)
}

export function getTags(filter, startDate, endDate, audience) {
    let URL = '/tags?'
    if (startDate) URL += `&startDate=${startDate}`
    if (endDate) URL += `&endDate=${endDate}`
    if (filter) URL += '&filter=true'
    if (audience) URL += '&audience=true'
    
    return axiosProvider.get(URL)
}
