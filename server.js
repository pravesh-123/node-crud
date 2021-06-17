const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOption = require("./swagger");
const users = require("./app/controllers/user.controller.js");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const jsDoc = swaggerJsDoc(swaggerOption);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(jsDoc));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to coding world." });
});

require("./app/routes/user.routes.js")(app);

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Get Users
 *    description: Get all Users
 *    responses:
 *        200:
 *          content:
 *             application/json:
 *                schema:
 *                  type: array
 *                  properties:
 *                      id:
 *                        type: integer
 *                      userName:
 *                        type: string
 *                      password:
 *                        type: string
 *                      email:
 *                        type: string
 */
// Retrieve all Users
app.get("/users", users.findAll);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
