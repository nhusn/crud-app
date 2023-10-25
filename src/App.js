import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Crud/Home';
import Create from './Crud/Create';
import Update from './Crud/Update';
import Read from './Crud/Read';

function App() {
  return (
    <Home/>
  );
}

export default App;
