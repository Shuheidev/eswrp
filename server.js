const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Welcome to eswrp application."});
});

require("./app/routes/legion.routes")(app);

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


const PORT = process.env.PORT || 8011;
const IP = process.env.IP;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
app.listen(IP, () => {
    console.log(`Server is running on ip ${IP}.`);
});



