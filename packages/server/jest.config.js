module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  },
  roots: ["<rootDir>/src/", "<rootDir>/__tests__/"],
  rootDir: "./",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  },
  testMatch: ["<rootDir>/__tests__/**/*.test.+(ts|js)"],
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  },
  preset: "ts-jest"
};
