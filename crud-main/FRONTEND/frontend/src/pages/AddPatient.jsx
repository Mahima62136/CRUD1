import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { createPatient } from '../services/api';
import FormInput from '../components/FormInput';

export default function AddPatient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    disease: '',
    contactNumber: ''
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === "age" && value < 0) {
    toast.error("Age cannot be negative");
      return;
  }
    

  setFormData({ ...formData, [name]: value });
};

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (formData.age < 0) {
    toast.error("Age cannot be negative");
    return;
  }
    setLoading(true);
    try {
      await createPatient(formData);
      toast.success('Patient added successfully!');
      navigate('/patients');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to add patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <button 
        onClick={() => navigate('/patients')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Patients
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <UserPlus size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Add Patient</h1>
            <p className="text-slate-400 mt-1">Register a new patient record into the system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Full Name"
            id="name"
            name="name"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={handleChange}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Age"
              type="number"
              id="age"
              name="age"
              placeholder="e.g. 35"
              required
              value={formData.age}
              onChange={handleChange}
            />
            <FormInput
              label="Gender"
              type="select"
              id="gender"
              name="gender"
              required
              options={["Male", "Female", "Other"]}
              value={formData.gender}
              onChange={handleChange}
            />
          </div>

          <FormInput
            label="Disease / Diagnosis"
            id="disease"
            name="disease"
            placeholder="e.g. Viral Fever, COVID-19"
            value={formData.disease}
            onChange={handleChange}
          />

          <FormInput
            label="Contact Number"
            id="contactNumber"
            name="contactNumber"
            placeholder="+1 234 567 890"
            required
            value={formData.contactNumber}
            onChange={handleChange}
          />

          <div className="pt-4 border-t border-slate-700/50">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  Save Patient Record
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
