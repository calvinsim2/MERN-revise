require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI
const SECRET = process.env.SECRET;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  mongoose.connection.once("open", () => {
    console.log("connected to mongo");
  });
  
  app.use(
    session({
      secret: SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

//* MIDDLEWARE

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(cookieParser())
app.use(express.json());
const projectsController = require("./controllers/projectsController");
const componentsController = require("./controllers/componentsController");
const usersController = require("./controllers/usersController");
app.use("/api/projects", projectsController);
app.use("/api/components", componentsController);
app.use("/api/users", usersController);


//* ROUTES

// app.get("/", (req, res) => {
//     res.json("Start liao!");
//   });

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});
  
//* LISTEN
  
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});