const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://192.168.1.78:31264",
    token: "d7fd8bcbe8fb344280999a6af10489c02e43c391",
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/tests/**",
      "sonar.tests": "./src/tests",
      "sonar.test.inclusions": "./src/tests**/*.test.jsx,./src/tests/**/*.test.js",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "./test-report.xml",
    },
  },
  () => {},
);