import axiosProvider from './config/backend2';

export function getKeyWordsList(url, currentPage, resultsPerPage, orderBy, orderType) {
    return axiosProvider.get(`/keyWords/getKeyWordsList/${url}`,{
        params:{
            currentPage,
            resultsPerPage,
            orderBy,
            orderType
        }
    });
}