const system = require("./system");
const sensors = require("./microservices");
const specific = require("./specific");

module.exports = () => ({
  tests: { tests: [system, sensors, specific] },
});
