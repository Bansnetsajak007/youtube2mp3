const axios = require('axios');
require("dotenv").config();

const getVidTitle = async (vidID) => {
    const options = {
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/dl',
        params: {id: `${vidID}`},
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': process.env.HOST_TITLE
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