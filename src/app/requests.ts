import axios from 'axios';

const endpoint = 'http://127.0.0.1:5000/api';
export const imgurl = 'http://127.0.0.1:5000';

export function axiosGet(url: string) {
  return axios.request({
    method: 'GET',
    url: `${endpoint}${url}`,
  });
}

export function axiosPost(url: string, data: {}) {
  return axios.request({
    method: 'POST',
    url: `${endpoint}${url}`,
    data: data,
  });
}

export function axiosPatch(url: string, data: any) {
  return axios.request({
    method: 'PATCH',
    url: `${endpoint}${url}`,
    data: data,
  });
}

export function axiosDelete(url: string, data: any) {
  return axios.request({
    method: 'DELETE',
    url: `${endpoint}${url}`,
    data: data,
  });
}
