import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ExcelUpload from './pages/ExcelUpload'
import ExcelTable from './pages/ExcelTable';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<ExcelUpload />} />
      <Route path="/excel" element={<ExcelTable />} />
    </Routes>
  )
}

export default App