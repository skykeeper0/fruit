const app = require('express').Router();

app.use(require('body-parser').json());

app.use('/api', require('./fruit'))

app.use((err, req, res, next) => {
    if(err) {
        next(); }
    console.log('err:', err);
});

module.exports = app;
