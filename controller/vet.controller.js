const express = require('express')
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);


const Vet = require('../model/vet.model');

exports.findAll = function (req, res) {
    Vet.findAll(function (err, vet) {
        console.log('controller')
        if (err)
            res.send(err);
        res.render('vet.ejs', { Vet: vet });
        //res.send(vet);
    });
};

exports.create = function (req, res) {
    const new_vet = new Vet(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        req.status(400).send({ error: true, message: "Please provide all required field" });
    } else {
        Vet.create(new_vet, function (err, vet) {
            if (err)
                res.send(err);
            //res.json({ error: false, message: "vet added successfully!", data: vet });
            res.redirect('/api/vet')
        });
    }
};

exports.findById = function (req, res) {
    Vet.findById(req.params.id, function (err, vet) {
        if (err) res.send(err);
        //res.json(vet);
        res.render('vet_edit.ejs', { Vet: vet });
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: "Please provide all required fields" });
    } else {
        Vet.update(req.params.id, new Vet(req.body), function (err, vet) {
            if (err) res.send(err);
            res.redirect('/api/vet');
            // res.json({ error: false, message: "vet updated successfully!", data: vet });
        });
    }
}

exports.delete = function (req, res) {
    Vet.delete(req.params.id, function (err, vet) {
        console.log("HI" + req.params.id);
        if (err) res.send(err);
        //res.json({ error: false, message: "vet deleted successfully!", data: vet });
        res.redirect('/api/vet');
    });
};

