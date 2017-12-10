const { Student, Campus } = require('../db/models');
const db = require('../db');
const express = require('express');
const router = express.Router();



router.get('/', (req, res, next) => {
  return Student.findAll({include: [{model: Campus}]})
  .then(students => res.json(students))
})

router.get('/:studentId', (req, res, next) => {
  return Student.findById(req.params.studentId, {
    include: [{model: Campus}]
  })
  .then(student => res.json(student));
});

router.post('/', (req, res, next) => {
  const student = Student.build({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gpa: req.body.gpa,
  });
  student.setCampus(req.body.campusId);
  return student.save()
  .then(updatedStudent => res.status(201).json(updatedStudent))
  .catch(next);
});



router.put('/:studentId', (req, res, next) => {
  console.log("req.body from put route", req.body);
  return Student.update(req.body, {
    where: { id: req.params.studentId },
    returning: true,
    plain: true
  })
  .then(([numRows, updatedRows]) => res.json(updatedRows))
  .catch(next);
});

router.delete('/:studentId', (req, res, next) => {
  return Student.destroy({
    where: {
      id: req.params.studentId
    }
  })
  .then(affectedRows => res.status(200).json(affectedRows))
  .catch(next);
});


module.exports = router;
