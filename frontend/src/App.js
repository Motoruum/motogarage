import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import StockTable from './components/StockTable';
import StockForm from './components/StockForm';
import Navigation from './components/Navigation';
import ScaleFilter from './components/ScaleFilter';
import ScaleDashboard from './components/ScaleDashboard';

// Global CSS for better readability
const globalStyles = `
  .table {
    font-size: 14px !important;
  }
  
  .table th {
    font-size: 13px !important;
    font-weight: bold !important;
    padding: 12px 8px !important;
  }
  
  .table td {
    padding: 10px 8px !important;
    vertical-align: middle !important;
  }
  
  .btn-sm {
    font-size: 13px !important;
    font-weight: bold !important;
  }
  
  .badge {
    font-size: 12px !important;
    font-weight: bold !important;
  }
  
  .form-control, .form-select {
    font-size: 14px !important;
  }
  
  .card-header h2 {
    font-size: 24px !important;
    font-weight: bold !important;
  }
`;

function App() {
  return (
    <Router>
      <div className="App">
        <style>{globalStyles}</style>
        <Navigation />
        <Container fluid className="mt-3">
          <Routes>
            <Route path="/" element={<StockTable />} />
            <Route path="/dashboard" element={<ScaleDashboard />} />
            <Route path="/add" element={<StockForm />} />
            <Route path="/edit/:id" element={<StockForm />} />
            <Route path="/scale/:scale" element={<ScaleFilter />} />
          </Routes>
        </Container>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
