const express = require("express");
const request = require("supertest");
const authRouter = require("../routes/auth-router");
const app = express();

app.use(express.json());
app.use("/api", authRouter);

describe("Test for the auth API", () => {
  it("POST /api/user - success - add a new user to the database", async () => {
    const response = await request(app).post("/api/user");
    expect(response.statusCode).toEqual(200);
  });
});
