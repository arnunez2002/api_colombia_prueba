import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000,
});

const responseData = (response) => response.data.data;
const request = {
  create: (url, body) => instance.post(url, body).then(responseData),
  read: (url) => instance.get(url).then(responseData),
  update: (url, id, body) => instance.patch(url, id, body).then(responseData),
  delete: (url) => instance.delete(url).then(responseData),
};

export default request;
