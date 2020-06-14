var express = require("express");
var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
var router = express.Router();

const connectionStr = "mongodb://localhost:27017/guessthecolor";
mongoose.Promise = global.Promise;
mongoose.connect(connectionStr, { useNewUrlParser: true });
var conn = mongoose.connection;
autoIncrement.initialize(conn);

var gameScoreSchema = new mongoose.Schema({
  name: String,
  score: Number
});

gameScoreSchema.plugin(autoIncrement.plugin, "gameScore");
var gameScoreModel = mongoose.model("gameScore", gameScoreSchema);

/* Store Game Score. */
router.post("/submit", function(req, res, next) {
  var gameScore = new gameScoreModel();
  gameScore.name = req.body.name;
  gameScore.score = req.body.score;
  gameScore.save(function(err, score) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json({ message: "Successfully saved" });
    }
  });
});

module.exports = router;
