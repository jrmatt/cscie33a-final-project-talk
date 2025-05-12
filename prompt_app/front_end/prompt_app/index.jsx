import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '../../components/App';

const rootElement = document.getElementById('app-home');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);