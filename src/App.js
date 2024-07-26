import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import ProductApp from './routes/Product-app';
import './css/App.css';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/ProductApp" element={<ProductApp />} />
      </Routes>
    </Router>
  );
}

export default App;
