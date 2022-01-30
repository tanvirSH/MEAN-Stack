const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsoptions = {
	// Website you wish to allow to connect
	"origin": "*",
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false,
	"optionsSuccessStatus": 204
};

const db = require("./app/models");
db.sequelize.sync();
/*** 
db.sequelize.sync({ force: true}).then(() => {
	console.log("Drop and re-sync db.");
}); */

app.use(cors(corsoptions));

// Parse request of content-type - application/json
app.use(bodyParser.json());

// Parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Simple route
app.get("/", (req, res) => {
	res.json({message: "Welcome to full stack application."});
});

require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});