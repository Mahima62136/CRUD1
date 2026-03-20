import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Search, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { getPatients, deletePatient } from '../services/api';
import PatientCard from '../components/PatientCard';
import Loader from '../components/Loader';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      // Ensure data is array (backend might return { count, data } or just array)
      const patientList = Array.isArray(data) ? data : data.data || [];
      setPatients(patientList);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch patients. Make sure the backend server is running.");
      toast.error("Could not load patients");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient record?")) {
      try {
        await deletePatient(id);
        setPatients(patients.filter(p => p._id !== id));
        toast.success("Patient removed successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete patient");
      }
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (patient.disease && patient.disease.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Patients Directory</h1>
          <p className="text-slate-400">Manage and view all registered patients</p>
        </div>
        
        <Link 
          to="/add" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95 whitespace-nowrap"
        >
          <Plus size={20} />
          Add Patient
        </Link>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search patients by name or disease..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
        />
      </div>

      {loading ? (
        <Loader text="Fetching patient records..." />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-2xl">
          <AlertCircle size={48} className="text-red-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Connection Error</h3>
          <p className="text-slate-400 max-w-md">{error}</p>
          <button 
            onClick={fetchPatients}
            className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-2xl">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No patients found</h3>
          <p className="text-slate-400">
            {searchTerm ? "No results match your search criteria." : "There are currently no patients in the system."}
          </p>
          {!searchTerm && (
            <Link to="/add" className="inline-block mt-6 text-blue-400 hover:text-blue-300 font-medium pb-1 border-b border-blue-400/30 hover:border-blue-300">
              Add your first patient
            </Link>
          )}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredPatients.map(patient => (
              <PatientCard 
                key={patient._id} 
                patient={patient} 
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
