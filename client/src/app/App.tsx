import React from 'react';
import  AppRoutes  from './provider/AppRouters';
import './App.css';

function App(): JSX.Element {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;