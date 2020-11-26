import axiosProvider from './config/backend2';

export function getKeyWordsList(params) {
    return axiosProvider.get(`/keyWords/getKeyWordsList/`,{
        params
    });
}

export function weeklyschedule(body) {
    return axiosProvider.post('/keyWords/weeklyschedule', body)
}