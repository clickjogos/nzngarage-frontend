import axiosProvider from './config/backend2';

export function getKeyWordsList(url) {
    return axiosProvider.get(`/keyWords/getKeyWordsList/${url}`);
}