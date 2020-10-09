import axios from 'axios';

// const LOCAL = ''

const axiosProvider = axios.create({
  baseURL: LOCAL
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
