import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MetaMaskProvider } from '@metamask/sdk-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        logging: {
          developerMode: true,
        },
        checkInstallationImmediately: true, // This will automatically connect to MetaMask on page load
        dappMetadata: {
          name: 'Demo React App',
          url: window.location.host,
        },
        enableDebug: true,
        autoConnect: {
          enable: true,
        },
        storage: {
          enabled: true,
        },
      }}>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>,
);
