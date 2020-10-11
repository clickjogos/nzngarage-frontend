import axios from 'axios';

const PROD = 'http://nzn-garage-cluster-316ee121d9b40536dfeb045d2e84c949-0000.sjc03.containers.appdomain.cloud/api'

const axiosProvider = axios.create({
  baseURL: PROD
});

axiosProvider.interceptors.response.use(
  (response) => {
    return new Promise(async (resolve, reject) => {
      resolve(response);
    });
  },
  (err) => {
    return new Promise(async (resolve, reject) => {
      reject(err)
    });
  }
);

export default axiosProvider;
