const Service = require('../model/service.molel');

exports.findAll = function (req, res) {
    Service.findAll(function (err, service) {
        console.log('controller')
        if (err)
            res.send(err);
        res.send(service);
    });
};

exports.create = function (req, res) {
    const new_service = new Service(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        req.status(400).send({ error: true, message: "Please provide all required field" });
    } else {
        Service.create(new_service, function (err, service) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "service added successfully!", data: service });
        });
    }
};

exports.findById = function (req, res) {
    Service.findById(req.params.id, function (err, service) {
        if (err) res.send(err);
        res.json(service);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        req.status(400).send({ error: true, message: "Please provide all required field" });
    } else {
        Service.update(req.params.id, new Service(req.body), function (err, service) {
            if (err) res.send(err);
            res.json({ error: false, message: "service updated successfully!", data: service });
        });
    }
}

exports.delete = function (req, res) {
    Service.delete(req.params.id, function (err, service) {
        console.log("HI" + req.params.id);
        if (err) res.send(err);
        res.json({ error: false, message: "service deleted successfully!", data: service });
    });
};

