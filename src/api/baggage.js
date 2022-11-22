const axios = require('axios');
const {getData} = require('../helpers/storage');

const API_URL = require('../common/constants').API_URL + '/baggage';

const readToken = async () => {
  const data = await getData('passenger_app');

  if (!data) {
    return null;
  }
  return JSON.parse(data).token;
};

const create = async (userId, entity) => {
  try {
    const token = await readToken();
    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    const response = await axios.post(API_URL, {
      userId,
      ...entity,
    });
    return response;
  } catch (error) {
    return error.response;
  }
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

const remove = async baggageId => {
  try {
    const token = await readToken();
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.delete(`${API_URL}/${baggageId}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export {getAll, remove, create};
