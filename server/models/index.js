const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.hobby = require("./hobby.model.js")(mongoose);
db.goal = require("./goal.model.js")(mongoose);
db.goalResponse = require("./goalResponse.model.js")(mongoose);
db.userImage = require('./userImage.model.js')(mongoose);

module.exports = db;