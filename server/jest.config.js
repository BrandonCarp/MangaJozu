/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  // Verbose means it always reports a test
  verbose: true,
  forceExit: true,
  // clearMocks: true,
}

//  npm test --watchAll
