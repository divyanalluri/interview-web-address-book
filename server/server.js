require("colors");
var path = require("path");
var cors = require("cors");
var express = require("express");
var people = require(path.join(__dirname, "data/people.json"));

var app = express();

app.use(cors({ origin: "*" }));

app.use("/mockup/", express.static(path.join(__dirname, "mockup")));
app.get("/api/people", function (req, res) {
  res.end(JSON.stringify(people, null, "    "));
});

app.delete("/api/people/:id", (req, res) => {
  const contactId = parseInt(req.params.id, 10);

  if (isNaN(contactId)) {
    return res.status(400).json({ error: "Invalid contact ID" });
  }
  const contactIndex = people.people.findIndex((contact) => contact.id === contactId);

  if (contactIndex === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }
  people.people.splice(contactIndex, 1);
  res.status(200).json({ message: "Contact successfully deleted" });
});

var HTTP_PORT = 8080;

app.listen(HTTP_PORT, function (err) {
  if (err) {
    throw err;
  }

  console.log(("HTTP server listening on port " + HTTP_PORT).green);

  console.log("Mockup:".bold + " http://localhost:" + HTTP_PORT + "/mockup/");
  console.log(
    "People data:".bold + " http://localhost:" + HTTP_PORT + "/api/people"
  );
});
