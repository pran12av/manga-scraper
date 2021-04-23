// import exprress
const express = require('express');

// import different scrapers
const manga = require('./scrapers/manga');
const mangaInfo = require('./scrapers/mangaInfo');
const chapter = require('./scrapers/chapter');

const app = express();
const port = process.env.PORT || 5000;

// if you visit /chapter/
app.get('/chapter/*', (req, res) => {

    try {
        chapter(req.params[0]).then(function (value) {
            res.json(value);
        }).catch(err => console.log(err));
    } catch (err) {
        console.log(err);
    }
});

// if you visit /info/
app.get('/info/*', (req, res) => {

    try {
        mangaInfo(req.params[0]).then(function (value) {
            res.json(value);
        }).catch(err => console.log(err));
    } catch (err) {
        console.log(err);
    }
});

// if you visit /manga/
app.get('/manga/:page_num', (req, res) => {
    console.log(1);
    try {
        manga(req.params.page_num).then(function (value) {
            res.json(value);
        }).catch(err => console.log(err));
    } catch (err) {
        console.log(err);
    }
});

// if you visit home
app.get('/', (req, res) => {

    res.send("hello");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});





