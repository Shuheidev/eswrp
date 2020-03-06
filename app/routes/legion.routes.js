module.exports = app => {
    const legions = require("../controllers/legion.controller.js");

    var router = require("express").Router();

    // Create a new Legion
    router.post("/", legions.create);

    // Retrieve all Legions
    router.get("/", legions.findAll);

    // Retrieve all published Legions
    router.get("/published", legions.findAllPublished);

    // Retrieve a single Legion with id
    router.get("/:id", legions.findOne);

    // Update a Legion with id
    router.put("/:id", legions.update);

    // Delete a Legion with id
    router.delete("/:id", legions.delete);

    // Create a new Legion
    router.delete("/", legions.deleteAll);

    app.use('/api/legions', router);
};