module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Ensure Jest loads necessary setup
  moduleNameMapper: {
    "^axios$": "<rootDir>/src/__mocks__/axios.js", // Map axios to the mock
  },
};
