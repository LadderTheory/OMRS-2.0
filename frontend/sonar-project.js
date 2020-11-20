const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://192.168.1.78:31264",
    token: "d7fd8bcbe8fb344280999a6af10489c02e43c391",
    options: {
      "sonar.projectkey": "omrs-prototype"
      "sonar.sources": "./src",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "./test-report.xml",
      "sonar.qualitygate.wait" : "true"
    },
  },
  () => {},
);