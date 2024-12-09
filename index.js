const express = require("express");
const path = require("path");
const app = express();
const userModel = require("./models/user");

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});


app.get("/read", async (req, res) => {
  try {
    // Await the result of the query
    let allUsers = await userModel.find({});
    
    // Render the view with the users data
    res.render("read", { users: allUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("An error occurred while fetching users.");
  }
});

app.get("/delete/:id", async (req, res) => {
  
  // Await the result of the query
  let allUsers = await userModel.findOneAndDelete({_id: req.params.id});
  
  // Render the view with the users data
  res.redirect("/read");
})
app.get("/edit/:id", async (req, res) => {
  
    // Await the result of the query
    let allUsers = await userModel.findOne({_id: req.params.id});
    res.render('edit', {user: allUsers})
    // Render the view with the users data
    
})

app.post('/update/:id', async (req, res) => {
  let { name, email, image } = req.body;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, image },
    { new: true } // Return the updated document
  );
  res.redirect('/read');
});
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body
 let createdUser = await userModel.create({
    name,
    email,
    image,
  })

  res.redirect("/read")
});


app.listen(3000);
