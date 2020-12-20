const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));

apiRoutes(app);
htmlRoutes(app);

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}!`);
});