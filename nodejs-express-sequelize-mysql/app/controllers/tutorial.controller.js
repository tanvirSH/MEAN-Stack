const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and save new tutorial
exports.create = (req, res) => {
	//Valid request
	debugger;
	if(!req.body.title){
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	//Create a tutorial
	const tutorial = {
		id: req.body.id,
		title: req.body.title,
		description: req.body.description,
		published: req.body.published ? req.body.published : false
	};

	//Save Tutorial in database
	Tutorial.create(tutorial)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Tutorial."
			});
		});
};

//Retrieve all tutorials from database
exports.findAll = (req, res) => {
	const title = req.query.title;
	var condition = title ? { title: {[Op.like]: `%${title}` } } : null;

	Tutorial.findAll({ where: condition})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving tutorials."
			});
		});
};

// Find a single tutorial with an Id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Tutorial.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error Retrieving with id=" + id
			});
		});
};

//Update tutorial by Id in requiest
exports.update = (req, res) => {
	const id = req.params.id;
	Tutorial.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if(num == 1) {
				res.send({
					message: "Tutorial was updated successfully."
				});
			} else {
				res.send({
					message: `Can not update tutorial with id=${id}`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating tutorial with id=" + id
			});
		});
};

// Delete tutorial with specific id in request
exports.delete = (req, res) => {
	const id = req.params.id;

	Tutorial.destroy({
		where: { id: id }
	})
		.then(num => {
			if(num == 1) {
				res.send({
					message: "Tutorial was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Tutorial with id=${id}`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Can not deleted with id=" + id
			});
		});
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
  	where: {},
  	truncate: false
  })
  	.then(nums => {
  		res.send({
  			message: `${nums} Tutorials was deleted successfully!`
  		});
  	})
  	.catch(err => {
  		res.status(500).send({
  			 message: err.message || "Some error occurred while removing all tutorials."
  		});
  	});
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({
  	where: { published: true }
  })
  	.then(data => {
  		res.send(data);
  	})
  	.catch(err => {
  		res.status(500).send({
  			 message: err.message || "Some error occurred while retrieving tutorials."
  		});
  	});
};