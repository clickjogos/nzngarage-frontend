import axiosProvider from './config/backend2';

export function getKeyWordsList(currentPage, resultsPerPage, orderBy, orderType) {
    return axiosProvider.get(`/keyWords/getKeyWordsList/`,{
        params:{
            currentPage,
            resultsPerPage,
            orderBy,
            orderType
        }
    });
}