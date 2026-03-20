import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Phone, Activity, Calendar, Edit2, Trash2 } from 'lucide-react';

export default function PatientCard({ patient, onDelete }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl p-6 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
        <Link 
          to={`/edit/${patient._id}`}
          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
        >
          <Edit2 size={16} />
        </Link>
        <button 
          onClick={() => onDelete(patient._id)}
          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {patient.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{patient.name}</h3>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-700/50 text-slate-300">
            {patient.gender} • {patient.age} yrs
          </span>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <div className="flex items-center gap-3 text-slate-300 group/item">
          <Activity size={18} className="text-indigo-400 group-hover/item:text-indigo-300 transition-colors" />
          <span className="truncate">{patient.disease || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 group/item">
          <Phone size={18} className="text-indigo-400 group-hover/item:text-indigo-300 transition-colors" />
          <span>{patient.contactNumber}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 group/item">
          <Calendar size={18} className="text-indigo-400 group-hover/item:text-indigo-300 transition-colors" />
          <span>{new Date(patient.admissionDate).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}
