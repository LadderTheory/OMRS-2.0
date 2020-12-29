const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "https://sonarqube.sst.k8s.afcentcloud.us",
    token: "8f7fda77a94b7b1c565eed9bbe6156cd7303d450",
    options: {
      "sonar.projectKey": "omrs-master",
      "sonar.sources": ".",
      "sonar.exclusions": "**/tests/**",
      "sonar.tests": "./frontend/src/tests, ./server/tests",
      "sonar.test.inclusions": "./frontend/src/tests/*.test.js, ./server/tests/*.test.js",
      "sonar.javascript.lcov.reportPaths": "frontend/coverage/lcov.info, coverage/lcov.info",
      "sonar.testExecutionReportPaths": "./frontend/test-report.xml, ./test-report.xml",
      "sonar.qualitygate.wait": "true"
    },
  },
  () => {},
);