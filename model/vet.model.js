var connection = require('./../config/config.bd');

var Vet = function (vet) {
    this.id = vet.id;
    this.name = vet.name;
    this.specialty = vet.specialty;
    this.work_exp = vet.work_exp;
}

//Створення нового запису в БД
Vet.create = function (newVet, result) {
    connection.query("INSERT INTO vet set ?", newVet, function (err, res) {
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
Vet.findById = function (id, result) {
    connection.query("Select * from vet where id = ? ", id,
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
Vet.findAll = function (result) {
    connection.query("Select * from vet",
        function (err, res) {
            if (err) {
                console.log("ERROR: ", err);
                result(null, err);
            }
            else {
                console.log('vet: ', res);
                result(null, res);
            }
        });
}

//Зміна запису за id
Vet.update = function (id, cli, result) {
    connection.query("UPDATE vet SET name=?, specialty=?, work_exp=? WHERE id = ?",
        [cli.name, cli.specialty, cli.work_exp, id],
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
Vet.delete = function (id, result) {
    connection.query("DELETE FROM vet WHERE id = ?", [id],
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


module.exports = Vet;