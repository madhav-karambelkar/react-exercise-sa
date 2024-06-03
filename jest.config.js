/* eslint-disable no-undef */
process.env = {
  ...process.env,
  VITE_MOCK_RESPONSE_DELAY: "100",
  VITE_ROUTER_BASE_PATH: "/",
};

module.exports = {
  roots: ["<rootDir>/src/"],
  testEnvironment: "jsdom",
  resetMocks: true,
  setupFilesAfterEnv: ["../src/jest.setup.js"],
  collectCoverage: true,
  coverageDirectory: "jest-coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/assets/",
    "<rootDir>/src/mock/",
    "<rootDir>/src/testing/", 
    "index.ts",
  ],
};
