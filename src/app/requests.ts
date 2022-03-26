import axios from 'axios';

export const endpoint = `${process.env.REACT_APP_ENDPOINT}/api`;
export const imgurl = `${process.env.REACT_APP_ENDPOINT}`;

console.log(endpoint, imgurl);

export function axiosGet(url: string) {
  return axios.request({
    method: 'GET',
    url: `${endpoint}${url}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') ?? 'null'}`,
    },
  });
}

export function axiosPost(url: string, data: any) {
  return axios.request({
    method: 'POST',
    url: `${endpoint}${url}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') ?? 'null'}`,
    },
  });
}

export function axiosPatch(url: string, data: any) {
  return axios.request({
    method: 'PATCH',
    url: `${endpoint}${url}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') ?? 'null'}`,
    },
  });
}

export function axiosDelete(url: string, data: any) {
  return axios.request({
    method: 'DELETE',
    url: `${endpoint}${url}`,
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') ?? 'null'}`,
    },
  });
}
