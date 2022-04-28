module.exports = app => {
  const coinsController = require("../controllers/coinsController.js");

  app.route("/api/create").post(coinsController.create);
  app.route("/api/findAll").get(coinsController.getAllRecord);
};
