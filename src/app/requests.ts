import axios from 'axios';

const endpoint = 'http://9c22-122-178-205-113.ngrok.io/api';

export function axiosGet(url: string) {
  return axios.request({
    method: 'GET',
    url: `${endpoint}${url}`,
  });
}

export function axiosPost(url: string, data: any) {
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
