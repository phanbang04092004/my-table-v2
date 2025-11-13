export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.(css|scss|sass)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
};
