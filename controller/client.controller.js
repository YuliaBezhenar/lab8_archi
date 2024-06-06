const express = require('express')
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);

const Client = require('../model/client.model');

exports.findAll = function (req, res) {
    Client.findAll(function (err, client) {
        console.log('controller')
        if (err)
            res.send(err);
        res.render('client.ejs', { Client: client });
        //res.send(client);
    });
};

exports.create = function (req, res) {
    const new_client = new Client(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        req.status(400).send({ error: true, message: "Please provide all required field" });
    } else {
        Client.create(new_client, function (err, client) {
            if (err)
                res.send(err);
            res.redirect('/api/client')
            //res.json({ error: false, message: "client added successfully!", data: client });
        });
    }
};

exports.findById = function (req, res) {
    Client.findById(req.params.id, function (err, client) {
        if (err) res.send(err);
        //res.json(client);
        res.render('client_edit.ejs', { Client: client });
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please provide all required fields" });
    } else {
        Client.update(req.params.id, new Client(req.body), function (err, client) {
            if (err) res.send(err);
            res.redirect('/api/client');
            // res.json({ error: false, message: "client updated successfully!", data: client });
        });
    }
}

exports.delete = function (req, res) {
    Client.delete(req.params.id, function (err, client) {
        console.log("HI" + req.params.id);
        if (err) res.send(err);
        //res.json({ error: false, message: "client deleted successfully!", data: client });
        res.redirect('/api/client');
    });
};

