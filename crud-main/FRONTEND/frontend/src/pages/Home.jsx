import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Activity, HeartPulse } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl space-y-8"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
          <HeartPulse size={16} className="animate-pulse" />
          Modern Healthcare Management
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Manage Patients with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Precision</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          A seamless, beautiful, and secure dashboard to track hospital patients, 
          admissions, and records all in one place.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            to="/patients" 
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            <Users size={20} />
            View Patients
          </Link>
          <Link 
            to="/add" 
            className="w-full sm:w-auto px-8 py-4 glass text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:bg-slate-800/80 hover:scale-105 active:scale-95"
          >
            Add New Record
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
