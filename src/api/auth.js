const axios = require('axios');

const API_URL = require('../common/constants').API_URL + '/user';

console.log(API_URL);
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const register = async (fullname, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      fullname,
      email,
      password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export {login, register};
