import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import jsonData from './jsonData'; // Assuming you have the JSON data in a file named jsonData.js

ReactDOM.render(
  <React.StrictMode>
    <App jsonData={jsonData} />
  </React.StrictMode>,
  document.getElementById('root')
);
