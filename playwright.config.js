const config = { 
  timeout: 90000,
  globalSetup: require.resolve('./global-setup'),
  use: {
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: 'storageState.json'
  }
  };
  module.exports = config; 