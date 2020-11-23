const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://192.168.1.78:31264",
    token: "d7fd8bcbe8fb344280999a6af10489c02e43c391",
    options: {
      "sonar.projectKey": "omrs-prototype",
      "sonar.projectName": "omrs-prototype",
      "sonar.sources": ".",
      "sonar.exclusions": "**/tests/**",
      "sonar.tests": "./frontend/src/tests",
      "sonar.test.inclusions": "./frontend/src/tests/*.test.js",
      "sonar.javascript.lcov.reportPaths": "frontend/coverage/lcov.info",
      "sonar.testExecutionReportPaths": "./frontend/test-report.xml",
    },
  },
  () => {},
);