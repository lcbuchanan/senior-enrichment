const { Campus, Student } = require('../db/models');
const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  return Campus.findAll({include: [{model: Student}]})
  .then(campuses => res.json(campuses));
});

router.get('/:campusId', (req, res, next) => {
  return Campus.findById(req.params.campusId, {
    include: [{model: Student}]
  })
  .then(campus => res.json(campus));
});

router.post('/', (req, res, next) => {
  return Campus.create(req.body)
  .then(updatedCampus => res.status(201).json(updatedCampus))
  .catch(next);
});

router.put('/:campusId', (req, res, next) => {
  // const campus = Campus.build({
  //   name: req.body.name,
  //   imageUrl: req.body.imageUrl,
  //   description: req.body.description
  // });
  // if (req.body.studen)
  // campus.setStudent(req.body.studentId);
  // return campus.save()
  // .then(updatedCampus => res.status(201).json(updatedCampus))
  // .catch(next);
  return Campus.update(req.body, {
    where: { id: req.params.campusId },
    returning: true,
    plain: true
  })
  .then(([numRows, updatedRows]) => {
    console.log("RESPONSE FROM UPDATE: ", updatedRows);
    // updatedRows[0].setStudent(req.body.studentId);
    res.json(updatedRows[0]);
  })
  .catch(next);
});

router.delete('/:campusId', (req, res, next) => {
  return Campus.destroy({
    where: {
      id: req.params.campusId
    }
  })
  .then(affectedRows => res.status(200).json(affectedRows))
  .catch(next);
});



module.exports = router;
