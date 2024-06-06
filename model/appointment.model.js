var connection = require('./../config/config.bd');

var Appointment = function (appointment) {
    this.id = appointment.id;
    this.date = appointment.date;
    this.time = appointment.time;
    this.service_id = appointment.service_id;
    this.vet_id = appointment.vet_id;
    this.client_id = appointment.client_id;
}

//Створення нового запису в БД
Appointment.create = function (newAppointment, result) {
    connection.query("INSERT INTO appointment set ?", newAppointment, function (err, res) {
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
Appointment.findById = function (id, result) {
    connection.query("Select * from appointment where id = ? ", id,
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
Appointment.findAll = function (result) {
    connection.query("Select * from appointment",
        function (err, res) {
            if (err) {
                console.log("ERROR: ", err);
                result(null, err);
            }
            else {
                console.log('Appointment: ', res);
                result(null, res);
            }
        });
}

//Зміна запису за id
Appointment.update = function (id, app, result) {
    connection.query("UPDATE appointment SET date=?, time=? WHERE id = ?",
        [app.date, app.time, id],
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
Appointment.delete = function (id, result) {
    connection.query("DELETE FROM appointment WHERE id = ?", [id],
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


module.exports = Appointment;