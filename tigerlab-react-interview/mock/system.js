module.exports = {
  category: "system",
  description: "check system",
  tests: [
    {
      name: "Check system information",
      route: "/system/check-info",
    },
    {
      name: "Check system free storage",
      route: "/system/check-free-storage",
    },
    {
      name: "Check database status",
      route: "/system/check-database-status",
    },
  ],
};
