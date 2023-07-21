const db = require("../models");
const GoalResponse = db.goalResponse;


// Create and Save a new goalResponse
exports.create = (req, res) => {
    if (!req.body.goalId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
      // Create a goalResponse
        const goalResponse = new GoalResponse({
        goalId: req.body.goalId,
        success: req.body.success, 
        timeComplete: req.body.timeComplete,
        duration: req.body.duration,
        madeTaskEasyText: req.body.madeTaskEasyText,
        madeTaskHardText: req.body.madeTaskHardText,
        accomplishmentText: req.body.accomplishmentText,
        associatedImageIds: req.body.associatedImageIds
      });
    
      // Save goalResponse in the database
      goalResponse
        .save(goalResponse)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the goalResponse."
          });
        });
};

// Retrieve all goalResponses from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    GoalResponse.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving goalResponses."
      });
    });
};

exports.findByGoalId = (req, res) => {
  const id = req.params.id;
  var condition = id ? { goalId: { $regex: new RegExp(id), $options: "i" } } : {};
  GoalResponse.find(condition)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving goalResponses."
    });
  });
};

// Find a single goalResponse with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    GoalResponse.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find goalResponse with id=${id}.`
        });
      } else {
        res.send({
          message: data
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not find goalResponse with id=" + id
      });
    });
  
};

// Update a goalResponse by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      GoalResponse.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update goalResponse with id=${id}. Maybe goalResponse was not found!`
            });
          } else res.send({ message: "goalResponse was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating goalResponse with id=" + id
          });
        });
  
};

exports.delete = (req, res) => {
    const id = req.params.id;
    GoalResponse.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete goalResponse with id=${id}. Maybe goalResponse was not found!`
        });
      } else {
        res.send({
          message: "goalResponse was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete goalResponse with id=" + id
      });
    });
}

exports.deleteAll = (req, res) => {
    GoalResponse.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} goalResponses were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all goalResponses."
      });
    });
}