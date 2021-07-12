const express = require("express");
const cors = require("cors");
const hotel_api = require("./routes/hotel-api");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

const port = process.env.PORT || 3000;

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here
app.use('/hotel', hotel_api);

const listener = app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
