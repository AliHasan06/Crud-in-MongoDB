const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("ali");
});
app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "ali",
    username: "alihasan06",
    email: "alihassanraja06@gmail.com",
  });
  res.send(createdUser);
});

app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "alihasan06" },
    { name: "ali hasan" },
    { new: true }
  );
  res.send(updatedUser);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();

  res.send(users);
});
app.get("/delete", async (req, res) => {
  let users = await userModel.findOneAndDelete({ username: "alihasan06" });

  res.send(users);
});

app.listen(3000);
