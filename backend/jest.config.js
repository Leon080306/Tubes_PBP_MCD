const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
    testEnvironment: "node",

    transform: {
        ...tsJestTransformCfg,
    },

    testMatch: [
        "**/*.test.ts"
    ],

    collectCoverage: true,

    coverageDirectory: "coverage",

    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.test.ts",
        "!src/server.ts"
    ]
};