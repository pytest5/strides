require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("../frontend/dist")); // TODO study

const db = require("./db");
const devRouter = require("./routes/dev.js");
const usersRouter = require("./routes/users.js");
const teamsRouter = require("./routes/teams.js");
const stridesRouter = require("./routes/strides.js");
const itemsRouter = require("./routes/items.js");
const countriesRouter = require("./routes/countries.js");
const adminRouter = require("./routes/admin.js");
const verifyToken = require("./middlewares/verifyToken.js");

app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/teams", verifyToken, teamsRouter);
app.use("/api/items", itemsRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/strides", stridesRouter);

// app.use("/dev", devRouter);
// app.use("/teams", teamsRouter);

app.use((err, req, res, next) => {
  console.error("error....", err);
  // Extract the message and stack to send a more useful response
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal server error";
  // Send a proper error response with relevant information
  res.status(statusCode).json({
    status: "error",
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {}, // Show stack trace only in development mode
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
