module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

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

  /**
   * @swagger
   * /users:
   *  post:
   *   summary: Creates a new user.
   *   consumes:
   *     - application/json
   *   parameters:
   *     - in: body
   *       name: user
   *       description: The user to create.
   *       schema:
   *         type: object
   *         required:
   *           - userName
   *         properties:
   *           userName:
   *             type: string
   *           password:
   *             type: string
   *           email:
   *             type: string
   *   responses:
   *     201:
   *       description: Created
   */

  // Create a new User
  app.post("/users", users.create);

  /**
   * @swagger
   * /users/{userId}:
   *  get:
   *    summary: Get a user by id
   *    parameters:
   *      - in: path
   *        name: userId
   *        schema:
   *          type: string
   *        required: true
   *        description: User id
   *    responses:
   *        200:
   *           description: user description by id
   *           content:
   *              application/json:
   *        404:
   *           description:User was not found
   */

  // Retrieve a single User with userId
  app.get("/users/:userId", users.findOne);

  // Update a User with userId
  app.put("/users/:userId", users.update);

  /**
   * @swagger
   * /users/{userId}:
   *  delete:
   *    summary: Remove the User by id
   *    parameters:
   *      - in: path
   *        name: userId
   *        schema:
   *          type: string
   *        required: true
   *        description: The user id
   *    responses:
   *      200:
   *        description: The user was deleted
   *      404:
   *        description: The user was not found
   */

  // Delete a User with userId
  app.delete("/users/:userId", users.delete);
};
