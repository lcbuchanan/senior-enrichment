'use-strict'

const Sequelize = require('sequelize');
const db = require('../index.js');

const Campus = db.define('campus',{
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://lh5.ggpht.com/li5DQn0_vCOhRfCUZMVx34W4R36wsAFHlTOQYjCC-wUeD3M8Iqw5UibRTlBfHQ3Meq-Q=w300'
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Campus;
