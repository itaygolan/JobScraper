const axios = require('axios');
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const expressip = require('express-ip');

const app = express();
const PORT = process.env.PORT || 5000;

app.engine('.hbs', handlebars({ extname: '.hbs' }));

app.set("PORT", PORT);

app.use(express.static(path.join(__dirname, 'src')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index', { title: 'JobSearcher' });
});

app.get('/search', (req, res) => {    
    const queries = req.query;
    let url = `https://indreed.herokuapp.com/api/jobs`;
    if (queries) {
        axios.get(url, {
            params: queries,
            limit: '200'
        })
        .then(response => {
            console.log(response.data);
            res.render('search', { title: 'JobSearcher', jobs: response.data });
        })
        .catch(err => {
            console.log(err);
        });
    }
    else {
        res.render('search', { title: 'JobSearcher' });
    }

})

app.listen(app.get('PORT'), () => {
    console.log(`Server started on local host ${PORT}`);
});

