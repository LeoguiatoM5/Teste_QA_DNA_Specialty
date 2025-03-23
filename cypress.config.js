const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true, // Ativa a gravação de vídeo
  videoCompression: 32, // Define o nível de compressão (0 = sem compressão)
  videosFolder: 'cypress/videos', // Onde os vídeos serão salvos
  screenshotOnRunFailure: true, // Tira screenshots em caso de falha

  e2e: { // Define a URL base
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