import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import Error from './components/Error';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    
    <div className="App">
        <Router basename={process.env.REACT_APP_ROUTER_BASE||''}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
