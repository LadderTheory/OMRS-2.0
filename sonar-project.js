const sonarqubeScanner = require("sonarqube-scanner");
//Connection Info for SST Lab SonarQube instance. Comment either this one or the Azure one out depending on where you want to send the test results.
sonarqubeScanner(
  {
    serverUrl: "http://192.168.1.78:31264",
    token: "d7fd8bcbe8fb344280999a6af10489c02e43c391",
    options: {
      "sonar.projectKey": "omrs-prototype",
      "sonar.projectName": "omrs-prototype",
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

//Connection Info for Azure SonarQube instance. Comment either this one or the SST Lab one out depending on where you want to send the test results.
// sonarqubeScanner(
//   {
//     serverUrl: "https://sonarqube.sst.k8s.afcentcloud.us",
//     token: "b42591ab2fb121fa8906861dac61beba9827c4dd",
//     options: {
//       "sonar.projectKey": "omrs-master",
//       "sonar.projectName": "omrs-master",
//       "sonar.sources": ".",
//       "sonar.exclusions": "**/tests/**",
//       "sonar.tests": "./frontend/src/tests, ./server/tests",
//       "sonar.test.inclusions": "./frontend/src/tests/*.test.js, ./server/tests/*.test.js",
//       "sonar.javascript.lcov.reportPaths": "frontend/coverage/lcov.info, coverage/lcov.info",
//       "sonar.testExecutionReportPaths": "./frontend/test-report.xml, ./test-report.xml",
//       "sonar.qualitygate.wait": "true"
//     },
//   },
//   () => {},
// );