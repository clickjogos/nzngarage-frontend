import axiosProvider from './config/axios';

export function listPlannings() {
    return axiosProvider.get('/planning/');
}

export function savePlanning(object) {
    return axiosProvider.post('/planning/', object);
}

export function getPlanning(payload) {
    return axiosProvider.get('/planning/'+payload.id );
}


