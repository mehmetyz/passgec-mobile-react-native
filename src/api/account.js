const axios = require('axios');
const {getData} = require('../helpers/storage');

const API_URL = require('../common/constants').API_URL + '/user';

const readToken = async () => {
  const data = await getData('passenger_app');

  if (!data) {
    return null;
  }
  return JSON.parse(data).token;
};

const remove = async () => {
  try {
    const token = await readToken();
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.delete(`${API_URL}/me`);
    return response;
  } catch (error) {
    return error.response;
  }
};

const update = async (fullname, email, password, image) => {
  try {
    const token = await readToken();
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.put(`${API_URL}/me`, {
      fullname,
      email,
      password,
      image,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

const details = async () => {
  try {
    const token = await readToken();
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.get(`${API_URL}/me`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export {remove, update, details};
