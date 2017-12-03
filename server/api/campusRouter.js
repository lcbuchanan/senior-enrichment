const { Campus } = require('../db/models');
const db = require('../db')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  return Campus.findAll()
  .then(campuses => res.json(campuses))
})


module.export = router;
