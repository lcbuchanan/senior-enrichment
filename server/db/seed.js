
var Promise = require('bluebird');
var {
  db,
  Student,
  Campus
} = require('./models');

var data = {
  student: [
    {firstName: "Steph", lastName: "Paul", email: "email@bestEmail.com", gpa: 3.2 },
    {firstName: "Kevin", lastName: "Durnaugh", email: "email@bestEmail33.com", gpa: 3.1 },
    {firstName: "Kevin", lastName: "Brown", email: "email@worstEmail.com", gpa: 3.9 },
    {firstName: "Laura", lastName: "Weiss", email: "3email@bestEmail.com", gpa: 2.2 }
  ],
  campus: [
    {name: "Marvard", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg", description: "Harvard on Mars"},
    {name: "Saturn Yale", imageUrl: "https://solarsystem.nasa.gov/images/slideshow/Saturn_from_Cassini_319.jpg", description: "Yale, but on Saturn"},
    {name: "Jupiter-liard", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg", description: "Juiliard's jupiter campus"}
  ]
};

db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
      return db.model(name)
      .create(item);
    });
  });
})
.then(function () {
  console.log("Finished inserting data (press ctrl-c to exit)");
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
});
