const express = require("express");
const request = require("supertest");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const authRouter = require("../routes/auth-router");
const app = express();
const db = require("../config/dbConn");

app.use(express.json());
app.use("/auth", authRouter);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const mongoose = require("mongoose");

dotenv.config();
const PORT = process.env.PORT || 4000;

describe("Test for the auth API", () => {
  it("try to logout from the account", async () => {
    const response = await request(app).get("/auth/logout");
    expect(response.statusCode).toEqual(200);
  });
});

describe("Logging in as a registered a user", () => {
  it("login a user with all data fields", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "xyz987@gmail.com",
      password: "87654321",
    });
    expect(response.status).toEqual(200);
  }, 10000);

  it("login a user with no password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "xyz987@gmail.com",
    });
    expect(response.status).toEqual(400);
  });

  it("login a user with no email", async () => {
    const response = await request(app).post("/auth/login").send({
      password: "12345678",
    });
    expect(response.status).toEqual(400);
  });

  it("login a user with an invalid email", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "xyz9878@gmail.com",
      password: "12345678",
    });
    expect(response.status).toEqual(401);
  });

  it("login a user with an invalid password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "xyz987@gmail.com",
      password: "123456789",
    });
    expect(response.status).toEqual(401);
  });

  // afterAll((done) => {
  //   // Closing the DB connection allows Jest to exit successfully.
  //   mongoose.connection.close();
  //   done();
  // });
});

describe("Registering as a new user", () => {
  it("Register a user without username", async () => {
    const response = await request(app).post("/auth/register").send({
      firstName: "Test",
      userName: "",
      lastName: "User",
      email: "testuser@gmail.com",
      password: "testtest123",
      passwordVerify: "testtest123",
    });
    expect(response.status).toEqual(400);
  });

  it("Register a user without firstName", async () => {
    const response = await request(app).post("/auth/register").send({
      firstName: "",
      userName: "TestUser",
      lastName: "User",
      email: "testuser@gmail.com",
      password: "testtest123",
      passwordVerify: "testtest123",
    });
    expect(response.status).toEqual(400);
  });

  it("Register a user without last", async () => {
    const response = await request(app).post("/auth/register").send({
      firstName: "Test",
      userName: "TestUser",
      lastName: "",
      email: "testuser@gmail.com",
      password: "testtest123",
      passwordVerify: "testtest123",
    });
    expect(response.status).toEqual(400);
  });

  it("Register a user without email", async () => {
    const response = await request(app).post("/auth/register").send({
      userName: "TestUser",
      firstName: "Test",
      lastName: "User",
      email: "",
      password: "testtest123",
      passwordVerify: "testtest123",
    });
    expect(response.status).toEqual(400);
  });

  it("Register a user without password", async () => {
    const response = await request(app).post("/auth/register").send({
      userName: "TestUser",
      firstName: "Test",
      lastName: "User",
      email: "testuser@gmail.com",
      password: "",
      passwordVerify: "testtest123",
    });
    expect(response.status).toEqual(400);
  });

  it("Register a user with password mismatch", async () => {
    const response = await request(app).post("/auth/register").send({
      userName: "TestUser",
      firstName: "Test",
      lastName: "User",
      email: "testuser@gmail.com",
      password: "testtest123",
      passwordVerify: "testtest345",
    });
    expect(response.status).toEqual(400);
  });

  it("Register a user with password less than a length of 8", async () => {
    const response = await request(app).post("/auth/register").send({
      userName: "TestUser",
      firstName: "Test",
      lastName: "User",
      email: "testuser@gmail.com",
      password: "testtes",
      passwordVerify: "testtes",
    });
    expect(response.status).toEqual(400);
  });

  it("Register a user with existing user email", async () => {
    const response = await request(app).post("/auth/register").send({
      userName: "TestUser",
      firstName: "Test",
      lastName: "User",
      email: "xyz987@gmail.com",
      password: "testtest123",
      passwordVerify: "testtest123",
    });
    expect(response.status).toEqual(400);
  });

  // it("Register a user with all data fields", async () => {
  //   const response = await request(app).post("/auth/register").send({
  //     userName: "TestUser",
  //     firstName: "Test",
  //     lastName: "User",
  //     email: "testuser@gmail.com",
  //     password: "testtest123",
  //     passwordVerify: "testtest123",
  //   });
  //   expect(response.status).toEqual(200);
  // });
});

describe("Update user information", () => {
  it("Update a user with a non-existing user email", async () => {
    const response = await request(app).put("/auth/update").send({
      userEmail: "xyz9876@gmail.com",
      email: "xyz987@gmail.com",
      userName: "xyz987",
      firstName: "xyz",
      lastName: "123",
      currentPassword: "87654321",
      newPassword: "87654321",
      confirmNewPassword: "87654321",
    });
    expect(response.status).toEqual(500);
  });

  it("Update a user with no firstname", async () => {
    const response = await request(app).put("/auth/update").send({
      userEmail: "xyz987@gmail.com",
      email: "xyz987@gmail.com",
      userName: "xyz987",
      firstName: "",
      lastName: "123",
      currentPassword: "87654321",
      newPassword: "87654321",
      confirmNewPassword: "87654321",
    });
    expect(response.status).toEqual(400);
  });

  it("Update a user with no lastname", async () => {
    const response = await request(app).put("/auth/update").send({
      userEmail: "xyz987@gmail.com",
      email: "xyz987@gmail.com",
      userName: "xyz987",
      firstName: "xyz",
      lastName: "",
      currentPassword: "87654321",
      newPassword: "87654321",
      confirmNewPassword: "87654321",
    });
    expect(response.status).toEqual(400);
  });

  it("Update a user with no current password", async () => {
    const response = await request(app).put("/auth/update").send({
      userEmail: "xyz987@gmail.com",
      email: "xyz987@gmail.com",
      userName: "xyz987",
      firstName: "xyz",
      lastName: "987",
      currentPassword: "",
      newPassword: "87654321",
      confirmNewPassword: "87654321",
    });
    expect(response.status).toEqual(400);
  });

  it("Update a user with current mismatch password", async () => {
    const response = await request(app).put("/auth/update").send({
      userEmail: "xyz987@gmail.com",
      email: "xyz987@gmail.com",
      userName: "xyz987",
      firstName: "xyz",
      lastName: "987",
      currentPassword: "87654322",
      newPassword: "87654321",
      confirmNewPassword: "87654321",
    });
    expect(response.status).toEqual(401);
  });

  it("Update a user with new password mismatch", async () => {
    const response = await request(app).put("/auth/update").send({
      userEmail: "xyz987@gmail.com",
      email: "xyz987@gmail.com",
      userName: "xyz987",
      firstName: "",
      lastName: "123",
      currentPassword: "87654321",
      newPassword: "87654321",
      confirmNewPassword: "87654322",
    });
    expect(response.status).toEqual(400);
  });
});

describe("Send Reset Link", () => {
  it("No email address given", async () => {
    const response = await request(app).post("/auth/forget-password").send({
      email: "",
    });
    expect(response.status).toEqual(400);
  });
  it("No correspoding Email Address in data Base", async () => {
    const response = await request(app).post("/auth/forget-password").send({
      email: "1324@gmail.com",
    });
    expect(response.status).toEqual(401);
  });
});

describe("Reset Password", () => {
  const id = "656d74bf5615c6f87abb35e2";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTZkNzRiZjU2MTVjNmY4N2FiYjM1ZTIiLCJpYXQiOjE3MDE3NTM4NTV9.KI52xEvAVK0V0ACOkTJLWhnB-47SKbb0ap6XcCdadkg";
  const wrongExpiredDate = "2023-12-05T05:20:15.649Z";
  const correctExpiredDate = new Date();
  correctExpiredDate.setMinutes(correctExpiredDate.getMinutes() + 5);
  it("Link Expired", async () => {
    const response = await request(app)
      .post(`/auth/reset-password/${id}/${token}/${wrongExpiredDate}`)
      .send({
        password: "12345678",
        passwordVerify: "12345678",
      });
    expect(response.status).toEqual(400);
  });
  it("Not same password twice", async () => {
    const response = await request(app)
      .post(
        `/auth/reset-password/${id}/${token}/${correctExpiredDate.toISOString()}`
      )
      .send({
        password: "12345678",
        passwordVerify: "987654321",
      });
    expect(response.status).toEqual(400);
  });
  it("Empty field", async () => {
    const response = await request(app)
      .post(
        `/auth/reset-password/${id}/${token}/${correctExpiredDate.toISOString()}`
      )
      .send({
        password: "12345678",
        passwordVerify: "",
      });
    expect(response.status).toEqual(400);
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});
