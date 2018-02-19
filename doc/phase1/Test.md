# Test

The approach for the backend test driven development is to use Mocha as the test engine and Chai as the supplementary assertion library to perform asynchronous testing. In TDD, tests are created first and the code to make it pass is written after the fact. As for the front end we will use Selenium for client testing.

## Test Driven Development

Each service will have an assertion check to ensure the outputs are of JSON format. Additionally, the contents of each output will be checked for proper configuration validity.

## Continous Integration

The CI tool for the github repo to be used is Travis CI. The goal of the setup is to avoid any bugs that make a feature stop working after an update and to minimize the time spent debugging. Ideally, by attempting to catch potential errors, any latency bugs or false positives will be minimized.
