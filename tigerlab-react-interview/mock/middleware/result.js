let routes = [];
const data = [
  require("../microservices"),
  require("../system"),
  require("../specific"),
];
data.forEach((item) => {
  item.tests.forEach((item) => routes.push(item.route));
});

module.exports = function (req, res, next) {
  if (req.method === "POST" && routes.includes(req.url)) {
    res.jsonp({ result: Math.random() < 0.65 ? "true" : "false" });
    res.status(201);
    return res.end();
  }
  next();
};
