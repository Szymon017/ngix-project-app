import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainView from './components/MainView';
import LoginForm from './components/LoginForm';
import ErrorView from './components/ErrorView';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="home" element={<MainView />} />
          <Route exact path="login" element={<LoginForm/>} />
          <Route exact path="register" element={<Register/>} />
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
