import config from '../../config';
import axios from 'axios';

const baseUrl = config.API_URL;

const localUrl = 'http://192.168.137.1:8070/api/show';

const axiosRequest = (method, url, data, params) => {
  return axios({
    method,
    url: `${localUrl}${url}`,
    data,
    params,
  });
};

export const getData = (url, params, data) => {
  return axiosRequest('GET', url, data, params);
};

export const loginApi = data => {
  return axiosRequest('POST', '/auth/login', data);
};

export const signup = body => {
  const URL = localUrl + '/users/add';

  return axios.post(URL, body);
};

export const addProductApi = (body, token) => {
  const URL = baseUrl + '/products/add';

  return axios.post(URL, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const addPromoApi = (body, token) => {
  console.log(token);
  const URL = baseUrl + '/promos/add';
  return axios.post(URL, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const addTransactionApi = (body, token) => {
  console.log(token);
  const URL = baseUrl + '/transactions/create';
  return axios.post(URL, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const getAllTransactionApi = () => {
  const URL = baseUrl + '/transactions/all';
  return axios.get(URL);
};

export const editTransactionApi = (body, id) => {
  console.log(body);
  const URL = baseUrl + `/transactions/modify/?id=${id}`;
  return axios.patch(URL, body);
};


export const getHistoryTransactionApi = (token) => {
  const URL = localUrl + `/transactions/history`;
  return axios.get(URL, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const deleteHistoryApi = (id, token) => {
  console.log(id);
  console.log(token);
  const URL = baseUrl + `/transactions/delete_history/?id=${id}`;
  return axios.delete(URL, {
    headers: {
      'x-access-token': token,
    },
  });
};


export const getProduct = param => {
  const queryParam = {
    filter: param.filter ?? '',
    sort: param.sort ?? 'id',
  };
  const URL =
    baseUrl +
    `/products/all?filter=${queryParam.filter}&page=1&sort=${queryParam.sort}&limit=12`;
  return axios.get(URL);
};

export const getProducts = (param, counter) => {
  const queryParam = {
    filter: param.filter ?? '',
    sort: param.sort ?? 'asc',
    search: param.search ?? '',
    page: param.page ?? '1',
  };
  const URL =
    localUrl +
    `/products/all?search=${queryParam.search}&filter=${queryParam.filter}&page=${counter}&sort=${queryParam.sort}&limit=100`;

  return axios.get(URL);
};

export const getProductById = id => {
  const URL = localUrl + `/products/product_detail/?id=${id}`;
  return axios.get(URL);
};

export const getProfile = (id, token) => {
  const URL = localUrl + `/users/profile/?id=${id}`;
  return axios.get(URL, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const editprofilesApi = (body, token, id) => {
  const URL = baseUrl + `/users/modify/?id=${id}`;
  return axios.patch(URL, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const getPromo = () => {
  const URL = baseUrl + `/promos/all`;
  return axios.get(URL, {});
};

export const editPromo = (body, idPromo) => {
  const login = JSON.parse(localStorage.getItem('userInfo'));
  const token = login.token;
  const id = login.id;
  const URL = baseUrl + `/promos/modify/?id=${idPromo}`;
  return axios.patch(URL, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const editProductApi = (body, idProduct, token) => {
  const URL = baseUrl + `/products/modify/?id=${idProduct}`;
  return axios.patch(URL, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

// console.log(baseUrl);
export const logoutApi = token => {
  const URL = baseUrl + `/auth/logout`;
  return axios.delete(URL, {
    headers: {
      'x-access-token': token,
    },
  });
};
