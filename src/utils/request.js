import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const request = async ({ ...options }) => {
  const token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return axios(options);
};

export default request;
