const sonarqubeScanner = require("sonarqube-scanner");
//Connection Info for SST Lab SonarQube instance. Comment either this one or the Azure one out depending on where you want to send the test results.
//This code specifies the server address for sonarqube, the authentication token (passed through an environmental variable), Options are: the project name
//and key from sonarqube, the sources (. specifies everything in the root directory), folders to exclude from the sonar scan, folders that contain the 
//code tests, file nameing convention for test files, the test coverage report path, files to exclude from the test report and sonar.qualitygate.wait
//which tells gitlab to halt the pipeline if the sonarqube test fails.
//Adjust which authentication token the SONARQUBE environmental variable refers to based on where you want to send the report
sonarqubeScanner(
  {
    serverUrl: "http://192.168.1.78:31264",
    token: process.env.SONARQUBE,
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
//Adjust which authentication token the SONARQUBE environmental variable refers to based on where you want to send the report
// sonarqubeScanner(
//   {
//     serverUrl: "https://sonarqube.sst.k8s.afcentcloud.us",
//     token: process.env.SONARQUBE,
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