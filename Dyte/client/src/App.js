import './App.css';
import LogsPage from './Pages/LogsPage';
import Addlogs from './components/Addlogs';
import Navbarrect from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbarrect />
      <Router>
        <Routes>
          <Route path="/" element={<LogsPage />} />
          <Route path="/addlogs" element={<Addlogs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
