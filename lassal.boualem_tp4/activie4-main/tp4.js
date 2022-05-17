var express = require('express');
var app = express();
var router = express.Router();
app.use(router);
app.listen(3000);
var routesVersioning = require('../index')();

router.use(function(req, res, next) {
    req.version = '1.0.1';
    next();
});

router.get('/authors', routesVersioning({
   "1.0.0": respondV1,
   "1.0.1": respondV2,
}, NoMatchFoundCallback));

function NoMatchFoundCallback(req, res, next) {
    res.status(404).send('version not found');
}

function respondV1(req, res, next) {
   res.status(200).send('ok v1');
}

function respondV2(req, res, next) {
   res.status(200).send('ok v2');
}
