const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true, // ativa a gravação de vídeo
  videoCompression: 32, // define o nível de compressão (0 = sem compressão)
  videosFolder: 'cypress/videos', // onde os vídeos serão salvos
  screenshotOnRunFailure: true, // tira screenshots em caso de falha

  e2e: {
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: true,
      json: true,
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
});