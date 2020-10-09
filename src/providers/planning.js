import axiosProvider from './config/axios';



export function listPlannings() {
    return axiosProvider.get('/planning/');
}
