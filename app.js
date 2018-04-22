var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.post("/login", function (req, res, next) {
    var apikey = req.body.apikey;
    var username = req.body.username;
    var userkey = req.body.userkey;
    request({
        method: 'POST',
        url: 'https://api.thetvdb.com/login',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "apikey": apikey, "username": username, "userkey": userkey })
    }, function (error, response, body) {
        res.json({ "token": JSON.parse(body).token });
    });
});

app.get("/series/:id/images/query", function (req, res, next) {    
    var id = req.params.id;
    var keyType = req.query.keyType;
    var token = req.get("Authorization");
    request({
        method: 'GET',
        url: 'https://api.thetvdb.com/series/' + id + '/images/query?keyType='+keyType,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }, function (error, response, body) {
        res.json(JSON.parse(body));
    });
});

app.get("/series/:id", function (req, res, next) {    
    var id = req.params.id;
    var token = req.get("Authorization");
    var language = req.get("Accept-Language");
    request({
        method: 'GET',
        url: 'https://api.thetvdb.com/series/' + id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            "Accept-Language": language
        }
    }, function (error, response, body) {
        res.json(JSON.parse(body));
    });
});

app.get("/episodes/:id", function (req, res, next) {    
    var id = req.params.id;
    var token = req.get("Authorization");
    var language = req.get("Accept-Language");
    request({
        method: 'GET',
        url: 'https://api.thetvdb.com/episodes/' + id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            "Accept-Language": language
        }
    }, function (error, response, body) {
        res.json(JSON.parse(body));
    });
});
app.get("/refresh_token", function (req, res, next) {    
    var id = req.params.id;
    var token = req.get("Authorization");
    request({
        method: 'GET',
        url: 'https://api.thetvdb.com/refresh_token /',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }, function (error, response, body) {
        res.json(JSON.parse(body));
    });
});

app.listen(PORT);