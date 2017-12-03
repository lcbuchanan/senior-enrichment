'use-strict'

const Sequelize = require('sequelize');
const db = require('../index.js');


const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  gpa: {
    type: Sequelize.DECIMAL(12, 1),
    validate: {
      min: 0.0,
      max: 4.0
    }
  },
  //virtual field for full name
  name: {
    type: Sequelize.VIRTUAL,
    get(){
      return this.getDataValue('firstName') + this.getDataValue('lastName');
    }
  }
})

module.exports = Student;
