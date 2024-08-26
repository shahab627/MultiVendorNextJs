import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/home",
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
