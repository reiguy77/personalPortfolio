var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
const mongoose = require('mongoose')
const { MongoClient } = require("mongodb");

const uri =
  "mongodb://localhost:27017/?maxPoolSize=20&w=majority";
const client = new MongoClient(uri);

// Create new instance of the express server
var app = express();

// Define the way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());
var corsOptions = {
    origin: "http://localhost:4200"
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database! ... test");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Init the server
async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Establish and verify connection
      await client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to client");

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.error);


process.on('SIGINT', async function() {
await db.mongoose.close();
console.log('Server shutting down... \n Closed MongoDB Connection')
process.exit();
});

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});
hobby = require("./controllers/hobby.controller.js");
app.post("/api/hobby/", hobby.create);
app.get("/api/hobby/", hobby.findAll);
app.get("/api/hobby/:id", hobby.findOne);
app.delete("/api/hobby/:id", hobby.delete);
app.delete("/api/hobby/", hobby.deleteAll);
app.put("/api/hobby/:id", hobby.update);


goal = require("./controllers/goal.controller.js");
app.post("/api/goal/", goal.create);
app.get("/api/goal/", goal.findAll);
app.get("/api/goal/:id", goal.findOne);
app.delete("/api/goal/:id", goal.delete);
app.delete("/api/goal/", goal.deleteAll);
app.put("/api/goal/:id", goal.update);



goalResponse = require("./controllers/goalResponse.controller.js");
app.post("/api/goalResponse/", goalResponse.create);
app.get("/api/goalResponse/", goalResponse.findAll);
app.get("/api/goalResponse/goalId/:id", goalResponse.findByGoalId);
app.get("/api/goalResponse/:id", goalResponse.findOne);
app.delete("/api/goalResponse/:id", goalResponse.delete);
app.delete("/api/goalResponse/", goalResponse.deleteAll);
app.put("/api/goalResponse/:id", goalResponse.update);
// Errors handler.
function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}



// Define API endpoint for image uploads
upload = require("./controllers/userImage.controller.js");
app.post('/api/imageUpload', upload.create);
app.get('/api/imageUpload/:username', upload.findImagesByUsername);
app.post('/api/imageUpload/findImagesByIds', upload.findImagesByIds);
