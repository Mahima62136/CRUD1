import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Save, ArrowLeft, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { getPatient, updatePatient } from '../services/api';
import FormInput from '../components/FormInput';
import Loader from '../components/Loader';

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    disease: '',
    contactNumber: ''
  });

  useEffect(() => {
    fetchPatientData();
  }, [id]);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const data = await getPatient(id);
      
      const p = data.data || data;
      setFormData({
        name: p.name || '',
        age: p.age || '',
        gender: p.gender || '',
        disease: p.disease || '',
        contactNumber: p.contactNumber || ''
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch patient details");
      toast.error("Could not load patient");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updatePatient(id, formData);
      toast.success('Patient updated successfully!');
      navigate('/patients');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update patient');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Loading patient record..." />;

  if (error) return (
    <div className="py-20 text-center flex flex-col items-center">
      <h3 className="text-xl text-red-400 font-bold mb-4">{error}</h3>
      <button onClick={() => navigate('/patients')} className="glass px-6 py-2 rounded-lg text-white">Go Back</button>
    </div>
  );

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
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Edit size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Patient</h1>
              <p className="text-slate-400 mt-1">Update existing medical record</p>
            </div>
          </div>
          <button 
            onClick={fetchPatientData}
            className="p-3 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
            title="Reload Record"
          >
            <RefreshCw size={20} />
          </button>
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
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:opacity-50 hover:scale-[1.02] active:scale-95"
            >
              {saving ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  Update Patient Record
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
