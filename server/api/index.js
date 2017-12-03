'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
const { Campus, Student } = require('../db/models');
const campusRouter = require('./campusRouter');
const studentRouter = require('./studentRouter');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
//apiRouter.get('/hello', (req, res) => res.send({hello: 'world'}))

//THIS DOESNT WORK WHYYYY

// apiRouter.use('/campuses', campusRouter);
// apiRouter.use('/students', studentRouter);

// /api/campuses routes
apiRouter.get('/campuses', (req, res, next) => {
  return Campus.findAll({include: [{model: Student}]})
  .then(campuses => res.json(campuses));
});

apiRouter.get('/campuses/:campusId', (req, res, next) => {
  return Campus.findById(req.params.campusId, {
    include: [{model: Student}]
  })
  .then(campus => res.json(campus));
});

apiRouter.post('/campuses', (req, res, next) => {
  return Campus.create({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  })
  .then(campus => res.status(201).json(campus))
  .catch(next);
});

apiRouter.put('/campuses/:campusId', (req, res, next) => {
  return Campus.update(req.body, {
    where: { id: req.params.campusId },
    returning: true,
    plain: true
  })
  .then(([numRows, updatedRows]) => res.json(updatedRows))
  .catch(next);
});

apiRouter.delete('/campuses/:campusId', (req, res, next) => {
  return Campus.destroy({
    where: {
      id: req.params.campusId
    }
  })
  .then(affectedRows => res.status(200).json(affectedRows))
  .catch(next);
});


// /api/students routes
apiRouter.get('/students', (req, res, next) => {
  return Student.findAll({include: [{model: Campus}]})
  .then(students => res.json(students))
})

apiRouter.get('/students/:studentId', (req, res, next) => {
  return Student.findById(req.params.studentId, {
    include: [{model: Campus}]
  })
  .then(student => res.json(student));
});

apiRouter.post('/students', (req, res, next) => {
  return Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gpa: req.body.gpa,
  })
  .then(student => res.status(201).json(student))
  .catch(next);
});

apiRouter.put('/students/:studentId', (req, res, next) => {
  return Student.update(req.body, {
    where: { id: req.params.studentId },
    returning: true,
    plain: true
  })
  .then(([numRows, updatedRows]) => res.json(updatedRows))
  .catch(next);
});

apiRouter.delete('/students/:studentId', (req, res, next) => {
  return Student.destroy({
    where: {
      id: req.params.studentId
    }
  })
  .then(affectedRows => res.status(200).json(affectedRows))
  .catch(next);
});


module.exports = apiRouter;
