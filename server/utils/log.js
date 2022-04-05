const log4js = require("log4js");

log4js.configure({
  appenders: {
    std: { type: "stdout" },
    everything: { type: "file", filename: "logs/complete.log" },
    fatalApp: { type: "file", filename: "logs/fatal.log" },
    errorApp: { type: "file", filename: "logs/error.log" },
    debugApp: { type: "file", filename: "logs/debug.log" },
    infoApp: { type: "file", filename: "logs/info.log" },
    fatalFilter: {
      type: "logLevelFilter",
      level: "fatal",
      maxLevel: "fatal",
      appender: "fatalApp",
    },
    errorFilter: {
      type: "logLevelFilter",
      level: "error",
      appender: "errorApp",
    },
    debugFilter: {
      type: "logLevelFilter",
      level: "debug",
      maxLevel: "debug",
      appender: "debugApp",
    },
    infoFilter: {
      type: "logLevelFilter",
      level: "info",
      maxLevel: "info",
      appender: "infoApp",
    },
  },
  categories: {
    default: {
      appenders: [
        "fatalFilter",
        "errorFilter",
        "debugFilter",
        "infoFilter",
        "everything",
        "std",
      ],
      level: "all",
    },
  },
});
const logger = log4js.getLogger();

module.exports = logger;
