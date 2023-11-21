// const express = require("express");
// const request = require("supertest");
// const authRouter = require("../routes/auth-router");
// const app = express();

app.use(express.json());
app.use("/auth", authRouter);

describe("Test for the auth API", () => {
  it("try to logout from the account", async () => {
    const response = await request(app).get("/auth/logout");
    expect(response.statusCode).toEqual(200);
  });
});
