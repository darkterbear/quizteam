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

  // Join room
  app.post("/api/room/join/")
    .post(quizteamController.joinRoom);
  
  // Leave room
  app.post("/api/room/leave/")
    .post(quizteamController.leaveRoom);
  
  // Start game
  app.post("/api/room/start/")
    .post(quizteamController.startGame);
}