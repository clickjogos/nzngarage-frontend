import axiosProvider from './config/backend2';

export async function getAudience(params){
  return axiosProvider.get('/audience', {params})
}