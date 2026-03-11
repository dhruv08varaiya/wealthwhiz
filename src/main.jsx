import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
import './styles/global.css';
import './styles/bootstrap-overrides.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
