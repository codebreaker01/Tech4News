const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const http = require("http");
const server = http.createServer(app);

//Static Folder
app.use(express.static("public"));

//View Engine
app.set("view engine", "ejs");

//Middlewares
dotenv.config({ path: "config/config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

//Routes
const homeRoute = require("./routes/home");
const postsRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");

app.use("/", homeRoute);
app.use("/posts", postsRoute);
app.use("/categories",categoriesRoute);

//Server
try {
  server.listen(port, () => {
    console.log(
      `App Is Running On Port ${port} In ${process.env.NODE_ENV} Mode.`
    );
  });
} catch (error) {
  console.log(error);
}
