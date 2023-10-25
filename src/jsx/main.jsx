import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/index.css';
import WeatherApp from './components/WeatherApp.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
)
