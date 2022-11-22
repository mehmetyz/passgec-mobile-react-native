const axios = require('axios');
const {getData} = require('../helpers/storage');

const API_URL = require('../common/constants').API_URL + '/notification';

const readToken = async () => {
  const data = await getData('passenger_app');

  if (!data) {
    return null;
  }
  return JSON.parse(data).token;
};

const getAll = async userId => {
  try {
    const token = await readToken();
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.get(`${API_URL}/${userId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

const remove = async notificationId => {
  try {
    const token = await readToken();
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.delete(`${API_URL}/${notificationId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export {getAll, remove};
