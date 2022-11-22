const axios = require('axios');
const {
  THY_API_URL,
  THY_API_KEY,
  THY_API_SECRET,
} = require('../common/constants');

const API_URL = THY_API_URL;
axios.defaults.headers.common.apikey = THY_API_KEY;
axios.defaults.headers.common.apisecret = THY_API_SECRET;

const checkFlight = async (prefix, pnr, name, surname) => {
  try {
    const response = await axios.get(
      `${API_URL}?title=${prefix}&pnr=${pnr}&name=${name}${
        surname ? '&surname=' + surname : ''
      }`,
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

module.exports = {
  checkFlight,
};
