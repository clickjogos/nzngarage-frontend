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

export function searchWeeklySchedule(params) {
    return axiosProvider.get('/keyWords/weeklyschedule', {
        params
    })
}