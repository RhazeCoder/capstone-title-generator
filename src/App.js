import React from 'react';
import './App.css';
import GenerateCapstone from './GenerateCapstone.js';

export default function App() {
  return (

    <div className="App">
      <h1>Capstone Title Generator</h1>
      <GenerateCapstone />
      <p id="footer">Made with ❤️ by <a href="https://github.com/RhazeCoder" target="_blank" rel="noreferrer">RhazeCoder</a></p>
    </div>
  );
}