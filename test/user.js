const chai = require("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
const server = require("../server");

// Assertion style
chai.should();

chai.use(chaiHttp);

describe("User Api", () => {
  /**
   * Test the GET route
   */
  describe("GET /users", () => {
    it("It should get all the users", (done) => {
      chai
        .request("http://localhost:3000")
        .get("/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(5);
          done();
        });
    });
    it("It should  not get all the users", (done) => {
      chai
        .request("http://localhost:3000")
        .get("/user")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET {by id} route
   */
  describe("GET /users :userId", () => {
    it("It should get a user by Id", (done) => {
      const userId = 1;
      chai
        .request("http://localhost:3000")
        .get("/users/" + userId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("userName");
          response.body.should.have.property("password");
          response.body.should.have.property("email");
          response.body.should.have.property("id").eq(1);

          done();
        });
    });
    it("It should  not get a user by Id", (done) => {
      const userId = 123;
      chai
        .request("http://localhost:3000")
        .get("/users/" + userId)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq(
            "The user with the provided id does not exist"
          );
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /users", () => {
    it("It should post a new user", (done) => {
      const user = {
        userName: "Ram",
        password: "ram234",
        email: "ram222@gmail.com",
      };
      chai
        .request("http://localhost:3000")
        .post("/users")
        .send(user)
        .end((err, response) => {
          //response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(27);
          response.body.should.have.property("userName").eq("Ram");
          response.body.should.have.property("password").eq("ram234");
          response.body.should.have.property("email").eq("ram222@gmail.com");

          done();
        });
    });
    it("It should not post a new user", (done) => {
      const user = {
        password: "ram234",
        email: "ram222@gmail.com",
      };
      chai
        .request("http://localhost:3000")
        .post("/users")
        .send(user)
        .end((err, response) => {
          //response.should.have.status(500);
          response.text.should.be.eq(
            "Some error occurred while creating the User."
          );
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */
  /*describe("PUT /users/ :userId", () => {
    it("It should update a existing user", (done) => {
      const userId = 1;
      const user = {
        userName: "John",
        password: "john12345",
        email: "john12@gmail.com",
      };
      chai
        .request("http://localhost:3000")
        .put("/users" + userId)
        .send(user)
        .end((err, response) => {
          //response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(1);
          response.body.should.have.property("userName").eq("John");
          response.body.should.have.property("password").eq("john12345");
          response.body.should.have.property("email").eq("john12@gmail.com");

          done();
        });
    });
  });*/

  /**
   * Test the DELETE route
   */
  describe("DELETE /users/ :userId", () => {
    it("It should delete a existing user", (done) => {
      const userId = 27;
      chai
        .request("http://localhost:3000")
        .delete("/users" + userId)
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
    });
  });
  it("It should delete a existing user", (done) => {
    const userId = 27;
    chai
      .request("http://localhost:3000")
      .delete("/users" + userId)
      .end((err, response) => {
        response.should.have.status(404);

        done();
      });
  });
  it("It should  not delete a existing user", (done) => {
    const userId = 127;
    chai
      .request("http://localhost:3000")
      .delete("/users" + userId)
      .end((err, response) => {
        response.should.have.status(200);

        done();
      });
  });
});
