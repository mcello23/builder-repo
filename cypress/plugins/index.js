const cucumber = require('cypress-cucumber-preprocessor').default;

// Configurações de UI específicas para o Builder
const setUIConfig = (launchOptions) => {
  launchOptions.args = launchOptions.args || [];
  launchOptions.args.push('--window-size=1920,1080');
  launchOptions.args.push('--disable-dev-shm-usage');
  return launchOptions;
};

// Função para configurar a linguagem do browser
function setLanguage(browser, launchOptions) {
  switch (browser.name) {
    case 'chrome':
      launchOptions.args.push('--lang=en');
      break;
    case 'firefox':
      launchOptions.preferences['intl.accept_languages'] = 'en';
      break;
    case 'edge':
      launchOptions.args.push('--lang=en');
      break;
    default:
      console.warn(
        `Nenhuma configuração de linguagem para o browser: ${browser.name}`,
      );
  }
  return launchOptions;
}

// Tasks personalizadas para o Builder
const builderTasks = {
  // Task para validar landing templates
  validateLandingTemplate: (templateData) => {
    return templateData ? true : false;
  },

  // Task para manipular dados da API
  handleApiData: (data) => {
    return data;
  },

  // Task para verificar status de landing
  checkLandingStatus: (landingId) => {
    return landingId ? 'published' : 'draft';
  },
};

module.exports = async (on, config) => {
  // Configuração do preprocessor do Cucumber
  on('file:preprocessor', cucumber());

  // Configurações do browser
  on('before:browser:launch', (browser = {}, launchOptions) => {
    launchOptions = setLanguage(browser, launchOptions);
    launchOptions = setUIConfig(launchOptions);
    return launchOptions;
  });

  // Screenshot personalizado
  on('after:screenshot', (details) => {
    return details;
  });

  // Registrar tasks personalizadas
  on('task', {
    ...builderTasks,
  });

  // Configurações adicionais para ambiente de teste
  config.env.builderUrl = 'https://builder.identity-platform.net';
  config.env.apiTimeout = 30000;

  return config;
};
