
var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
let db = require('./models')
const leetCodeRoutes = require("./routes/leetCodeRoutes");
const emailRoutes = require("./routes/emailRoutes");
const fileRoutes = require("./routes/fileRoutes");
var multer = require('multer');

// Create new instance of the express server
var app = express();

var corsOptions = {
    origin: 'http://localhost:4201',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));
// Define the way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json({limit:'900mb'})); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// General error handler middleware
app.use(function(err, req, res, next) {
  if(err){
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size limit exceeded.' });
      }
      // Handle other multer errors if needed
    }
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
    
  
});

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
let port = 3000;
var server = app.listen( port, function () {
    console.log("App now running on port", port);
});


process.on('SIGINT', async () => {
    await db.closeConnection();
    process.exit(0);
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


app.use("/api/leetCode", leetCodeRoutes);


app.use("/api/email", emailRoutes);
app.use("/api/file", fileRoutes);
