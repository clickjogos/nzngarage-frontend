import axios from 'axios';

const PROD = 'https://nzn-garage-cluster-316ee121d9b40536dfeb045d2e84c949-0000.sjc03.containers.appdomain.cloud/backend2'

const axiosProvider = axios.create({
  baseURL: PROD
});

export default axiosProvider;
