const db = require("../models");
const Goal = db.goal;


// Create and Save a new Goal
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
      // Create a Goal
      const goal = new Goal({
        title: req.body.title,
        startDate: req.body.startDate, 
        task: req.body.task,
        frequency: req.body.frequency,
        duration: req.body.duration,
        why: req.body.why,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      });
    
      // Save Goal in the database
      goal
        .save(goal)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Goal."
          });
        });
};

// Retrieve all Goals from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Goal.find({condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving goals."
      });
    });
};

// Find a single Goal with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Goal.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Goal with id=${id}.`
        });
      } else {
        res.send({
          message: data
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not find Goal with id=" + id
      });
    });
  
};

// Update a Goal by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Goal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Goal with id=${id}. Maybe Goal was not found!`
            });
          } else res.send({ message: "Goal was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Goal with id=" + id
          });
        });
  
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Goal.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Goal with id=${id}. Maybe Goal was not found!`
        });
      } else {
        res.send({
          message: "Goal was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Goal with id=" + id
      });
    });
}

exports.deleteAll = (req, res) => {
    Goal.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Goals were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all goals."
      });
    });
}