const { Student } = require('../db/models');
const db = require('../db')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  return Student.findAll()
  .then(students => res.json(students))
})


module.export = router;
