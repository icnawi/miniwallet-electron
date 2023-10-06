import { StoreProvider } from 'easy-peasy';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './store';
import { App } from './ui/components/App';

const root = createRoot(document.getElementById('dapp'));

root.render(
  <StrictMode>
    <StoreProvider store={store}>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  </StrictMode>,
);
