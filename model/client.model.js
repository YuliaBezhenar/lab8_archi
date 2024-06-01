var connection = require('./../config/config.bd');

var Client = function (client) {
    this.id = client.id;
    this.name = client.name;
    this.email = client.email;
    this.contacts = client.contacts;
}

//Створення нового запису в БД
Client.create = function (newClient, result) {
    connection.query("INSERT INTO client set ?", newClient, function (err, res) {
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
Client.findById = function (id, result) {
    connection.query("Select * from client where id = ? ", id,
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
Client.findAll = function (result) {
    connection.query("Select * from client",
        function (err, res) {
            if (err) {
                console.log("ERROR: ", err);
                result(null, err);
            }
            else {
                console.log('Client: ', res);
                result(null, res);
            }
        });
}

//Зміна запису за id
Client.update = function (id, cli, result) {
    connection.query("UPDATE client SET name=? WHERE id = ?",
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
Client.delete = function (id, result) {
    connection.query("DELETE FROM client WHERE id = ?", [id],
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


module.exports = Client;