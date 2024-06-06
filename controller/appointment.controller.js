const express = require('express')
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);

const Appointment = require('../model/appointment.model');

exports.findAll = function (req, res) {
    Appointment.findAll(function (err, appointment) {
        console.log('controller')
        if (err)
            res.send(err);
        res.render('appointment.ejs', { Appointment: appointment });
        //res.send(appointment);
    });
};

exports.create = function (req, res) {
    const new_appointment = new Appointment(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        req.status(400).send({ error: true, message: "Please provide all required field" });
    } else {
        Appointment.create(new_appointment, function (err, appointment) {
            if (err)
                res.send(err);
            res.redirect('/api/appointment');
            //res.json({ error: false, message: "appointment added successfully!", data: appointment });
        });
    }
};

exports.findById = function (req, res) {
    Appointment.findById(req.params.id, function (err, appointment) {
        if (err) res.send(err);
        //res.json(appointment);
        res.render('appointment_edit.ejs', { Appointment: appointment });
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        req.status(400).send({ error: true, message: "Please provide all required field" });
    } else {
        Appointment.update(req.params.id, new Appointment(req.body), function (err, appointment) {
            if (err) res.send(err);
            res.redirect('/api/appointment');
            //res.json({ error: false, message: "appointment updated successfully!", data: appointment });
        });
    }
}

exports.delete = function (req, res) {
    Appointment.delete(req.params.id, function (err, appointment) {
        console.log("HI" + req.params.id);
        if (err) res.send(err);
        res.redirect('/api/appointment');
        //res.json({ error: false, message: "appointment deleted successfully!", data: appointment });
    });
};

