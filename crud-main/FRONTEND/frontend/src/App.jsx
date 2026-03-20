import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
import Home from './pages/Home';
import Patients from './pages/Patients';
import AddPatient from './pages/AddPatient';
import EditPatient from './pages/EditPatient';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
        {/* Subtle 3D Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <Background3D />
        </div>
        
        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/patients" element={<Patients />} />
                <Route path="/add" element={<AddPatient />} />
                <Route path="/edit/:id" element={<EditPatient />} />
              </Route>
            </Routes>
          </main>
        </div>
        
        <Toaster position="top-right" 
          toastOptions={{
            className: 'glass !bg-slate-800 text-white',
            style: { border: '1px solid rgba(59, 130, 246, 0.2)' }
          }} 
        />
      </div>
    </Router>
  );
}

export default App;
