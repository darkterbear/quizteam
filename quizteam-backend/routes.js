module.exports = (app) => {
  var quizteamController = require("./controllers.js");

  // Ping route
  app.get("/api/ping/", function(req, res) {
    res.json("pong");
  });

  // Create room
  app.route("/api/room/create/")
    .post(quizteamController.createRoom);

  // Destroy room
  app.route("/api/room/destroy/")
    .post(quizteamController.destroyRoom);
  
  // Start game
  app.post("/api/room/start/")
    .post(quizteamController.startGame);
}