import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home'

function App() {
  return (
    <div className="App">
      <Routes>

        <Route exact path="/" element={<LandingPage />} />

        <Route exact path="/home" element={<Home />} />

      </Routes >
    </div >
  );
}

export default App;
