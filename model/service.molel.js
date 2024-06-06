var connection = require('./../config/config.bd');

var Service = function (service) {
    this.id = service.id;
    this.name = service.name;
    this.price = service.price;
}

//Створення нового запису в БД
Service.create = function (newService, result) {
    connection.query("INSERT INTO service set ?", newService, function (err, res) {
        if (err) {
            console.log("ERROR: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

//Пошук за id
Service.findById = function (id, result) {
    connection.query("Select * from service where id = ? ", id,
        function (err, res) {
            if (err) {
                console.log("ERROR: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
};

//Виведення всіх клієнтів
Service.findAll = function (result) {
    connection.query("Select * from service",
        function (err, res) {
            if (err) {
                console.log("ERROR: ", err);
                result(null, err);
            }
            else {
                console.log('Service: ', res);
                result(null, res);
            }
        });
}

//Зміна запису за id
Service.update = function (id, cli, result) {
    connection.query("UPDATE service SET name=? WHERE id = ?",
        [cli.name, id],
        function (err, res) {
            if (err) {
                console.log("ERROR: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
}

//Видалення
Service.delete = function (id, result) {
    connection.query("DELETE FROM service WHERE id = ?", [id],
        function (err, res) {
            if (err) {
                console.log("ERROR: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
}


module.exports = Service;