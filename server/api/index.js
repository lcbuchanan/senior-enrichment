'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
const { Campus, Student } = require('../db/models');
const campusRouter = require('./campusRouter');
const studentRouter = require('./studentRouter');


apiRouter.use('/campuses', campusRouter);
apiRouter.use('/students', studentRouter);



module.exports = apiRouter;
