import axiosProvider from './config/axios';

export function trackingByPeriod(object) {
    return axiosProvider.get(`/tracking/${object.period}`);
}