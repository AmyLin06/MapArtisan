const express = require("express");
const request = require("supertest");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const mapRouter = require("../routes/map-router");
const authRouter = require("../routes/auth-router");
const app = express();
const db = require("../config/dbConn");

app.use(express.json());
app.use("/map", mapRouter);
app.use("/auth", authRouter);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const mongoose = require("mongoose");

dotenv.config();
const PORT = process.env.PORT || 4000;

describe("Creating a map", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY2MmVlZjlhYTA0OGIzYThmYWIyZjQiLCJpYXQiOjE3MDE3NTU1NzN9.lbOv-S8H6_DlgAcu-OhCaBL771QCtnAUHwLsjXP467U";

  beforeAll(async () => {
    // Return a promise here
    // token = await loginOfficialAccount();
    const response = await request(app).post("/auth/login").send({
      email: "mapartisan@gmail.com",
      password: "12345678",
    });

    token = response.body.token;
    console.log(response.header);

    // let token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY2MmVlZjlhYTA0OGIzYThmYWIyZjQiLCJpYXQiOjE3MDE3NTU1NzN9.lbOv-S8H6_DlgAcu-OhCaBL771QCtnAUHwLsjXP467U";
    if (token) {
      console.log("in before all");
      console.log(token);
    }
  });

  it("Creating a base map", async () => {
    await request(app)
      .post("/auth/login")
      .send({
        email: "mapartisan@gmail.com",
        password: "12345678",
      })
      .expect(200);

    console.log(token);
    authorizationValue = "bearer " + token;
    const createResponse = await request(app)
      .post("/map/create")
      //   .set("Authorization", `Bearer ` + token)
      .set("Authorization", authorizationValue)
      .send({
        name: "Map Router Test",
        map: "null",
        ownerEmail: "mapartisan@gmail.com",
      });

    expect(createResponse.status).toEqual(201);
  });
});

async function loginOfficialAccount() {
  return new Promise((resolve, reject) => {
    request(app)
      .post("/auth/login")
      .send({
        email: "mapartisan@gmail.com",
        password: "12345678",
      })
      .expect(200)
      .then((res) => {
        const setCookieHeader = res.headers["set-cookie"];
        const tokenMatch = /token=(.*?);/.exec(setCookieHeader);
        const authToken = tokenMatch && tokenMatch[1];
        if (!authToken) {
          console.error("Token not found in response");
          reject(new Error("Token not found in response"));
        } else {
          resolve(authToken);
        }
      })
      .catch((err) => reject(err));
  });
}

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});
