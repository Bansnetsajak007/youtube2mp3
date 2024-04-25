const axios = require('axios');
require("dotenv").config();

const getVidTitle = async (vidID) => {
    const options = {
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/dl',
        params: {id: `${vidID}`},
        headers: {
          'X-RapidAPI-Key': '71d2e5926bmsh6f68f198a07cda5p162612jsne71114d195e3',
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error.message);
      }
}

module.exports = {
    getVidTitle
}