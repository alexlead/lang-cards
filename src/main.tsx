import { createRoot } from 'react-dom/client'
import './assets/styles/style.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.tsx'

import { initDB } from './repository/db.ts';

initDB().then(() => {
  console.log('Database initialized');
});


createRoot(document.getElementById('root')!).render(
    <App />
)
