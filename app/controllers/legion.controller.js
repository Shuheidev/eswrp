const db = require("../models");
const Legion = db.legions;

// Create and Save a new Legion
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Legion
    const legion = new Legion({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    // Save Tutorial in the database
    legion
        .save(legion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Legion."
            });
        });
};

// Retrieve all Legions from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Legion.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving legions."
            });
        });
};

// Find a single Legion with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Legion.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Legion with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Legion with id=" + id });
        });
};

// Update a Legion by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Legion.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Legion with id=${id}. Maybe Legion was not found!`
                });
            } else res.send({ message: "Legion was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Legion with id=" + id
            });
        });
};

// Delete a Legion with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Legion.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Legion with id=${id}. Maybe Legion was not found!`
                });
            } else {
                res.send({
                    message: "Legion was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Legion with id=" + id
            });
        });
};

// Delete all Legions from the database.
exports.deleteAll = (req, res) => {
    Legion.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Legions were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all legions."
            });
        });
};

// Find all published Legions
exports.findAllPublished = (req, res) => {
    Legion.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving legions."
            });
        });
};