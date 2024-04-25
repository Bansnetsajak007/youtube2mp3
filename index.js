// will continue this tommorrow

const axios = require('axios');
const express = require('express');
const { getVidTitle } = require('./utility.js');
require("dotenv").config();

const app = express();

const PORT = 4000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.get("/", (req, res) => {
    res.render("app");
});

app.post("/convert-mp3", async (req, res) => {

    let viedoURL = req.body.viedoURL;

    if (viedoURL === undefined || viedoURL === '' || viedoURL === null) {
        return res.render('app', { success: false, message: "Please enter youtube viedo url" })
    } else {

        const options = {
            method: 'GET',
            url: 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/',
            params: {
                url: `${viedoURL}`
            },
            headers: {
                "x-rapidapi-key": process.env.API_KEY,
                "x-rapidapi-host": process.env.API_HOST
            }
        };

        try {
            const response = await axios.request(options);
            let titleResponse = await getVidTitle(response.data.videoid);
            if (response) {
                return res.render("app", { success: true, song_title: titleResponse.title, song_link: response.data.dlink });
            } else {
                return res.render("app", { success: false, message: response.data.msg });
            }
        } catch (error) {
            console.error(error);
        }
    }

});

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})
