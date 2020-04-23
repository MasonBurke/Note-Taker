// Dependencies
// =============================================================
var express = require("express");
var htmlRoutes = require("./Routes/htmlRoutes")
var apiRoutes = require("./Routes/apiRoutes")
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT||3001;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use("/api", apiRoutes)
app.use("/", htmlRoutes)

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  