'use strict';

const db = require('../index');
const Student = require('./students');
const Campus = require('./campuses');



Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
  db,
  Campus,
  Student
}
