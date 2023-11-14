import logo from './logo.svg';
import './App.css';
import Dashboard from './Pages/Dashboard';
import { Login } from './Pages/Login';
import { Route, Routes } from 'react-router-dom';
import AppRoute from './routers/AppRoute';

function App() {
  return (
    <div className="App">
      <AppRoute type={'app'} />
    </div>
  );
}

export default App;
