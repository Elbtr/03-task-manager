const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const { notFound } = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorhandler");

const tasks = require("./routes/tasks");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
