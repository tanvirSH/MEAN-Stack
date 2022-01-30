module.exports = app => {
	const tutorials = require("../controllers/tutorial.controller.js");

	var router = require("express").Router();

	// Create new tutorial
	router.post("/", tutorials.create);

	// Retriev all tutorials
	router.get("/", tutorials.findAll);

	//Retrieve all published Tutorial
	router.get("/published", tutorials.findAllPublished);

	//Retrieve a single tutorial with id
	router.get("/:id", tutorials.findOne);

	//Update a tutorial with id
	router.put("/:id", tutorials.update);

	//Delete a tuutorial with id
	router.delete("/:id", tutorials.delete);

	//Delete all tutorials
	router.delete("/", tutorials.deleteAll);

	app.use('/api/tutorials', router);
};