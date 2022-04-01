/* http://159.223.77.38/phpMyAdmin/index.php?route=/sql&db=Matrix&table=persontwo&pos=0 */
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const connection = require('./db/db')

// Middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1",require("./routes/router"));

app.listen(port, () => {
  console.log(`server is up on running port ${port}`);
});



