const db = require('./db/connection');

db.connect(err => err ? console.log(err) : console.log("connected!"));