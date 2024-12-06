const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
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
