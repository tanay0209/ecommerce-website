// IMPORTS
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnection = require("./db");

// ENV FILE
require("dotenv").config();

// DB CONNECTION
dbConnection();

// ROUTES
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
// CREATING THE APPLICATION
const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// MY ROUTES
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
// INITIAL ROUTE
app.get("/", (req, res) => {
  res.send("This is home page");
});

// CREATING AND STARTING SERVER
const port = 8000;
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
