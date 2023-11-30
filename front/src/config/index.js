const envVars = {};

// Capturar variáveis ENV (arquivo .env) e remover prefixo REACT_APP_
// https://create-react-app.dev/docs/adding-custom-environment-variables/
for (const envAttr in import.meta.env) {
  if (envAttr.startsWith('VITE_')) {
    envVars[envAttr.substr(5)] = import.meta.env[envAttr];
  }
}

const config = {
  // Padrões
  appKey: '@avafast',
  // Overrides
  ...envVars,
};

export default config;
