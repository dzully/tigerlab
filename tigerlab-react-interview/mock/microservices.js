module.exports = {
  category: "microservices",
  description: "check microservices",
  tests: [
    {
      name: "Check Rating Engine",
      route: "/services/check-rating-engine",
    },
    {
      name: "Check Insurance",
      route: "/services/check-insurance",
    },
    {
      name: "Check Auth",
      route: "/services/check-auth",
    },
    {
      name: "Check Policy",
      route: "/services/check-policy",
    },
  ],
};
