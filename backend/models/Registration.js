const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    EmployeeId:{ type: String, unique: true, required: [true, 'EmployeeIdshould be mandatory'] },
    Name: { type: String, unique: false, required: [true, 'Name should be mandatory'] },
    Salary: { type: Number, unique: false, required: [false, 'Salary should not be mandatory'] },
    Emailaddress: { type: String, unique: true, required: [true, 'Email should be mandatory'] },
    Password: { type: String,unique: false,  required: [true, 'Password not matching'] },
    // profilePicture: { type: String,unique: false,  required: [true, 'Pic not matching'] },
    profilePicture: { type: String, required: [false, 'picture should not be mandatory'] },
});


module.exports = mongoose.model('Employe',employeeSchema);



