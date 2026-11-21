import React from 'react';
import ReactDOM from 'react-dom/client';
import Platform from './platform/Platform';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow-condensed/latin-800.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import './styles.css';
import './culture.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><Platform /></React.StrictMode>,
);

import './history.css';

import './art-polish.css';

import './features.css';

// Platform styles load after the FASC styles so equal-specificity rules resolve in their favour.
import './platform/platform.css';
