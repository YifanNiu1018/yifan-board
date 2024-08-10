import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BoardNavbar from './components/BoardNavbar';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <BoardNavbar />
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
