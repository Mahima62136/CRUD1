import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Users, UserPlus, LogOut, LogIn } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const navLinks = [
    { path: '/patients', label: 'Patients', icon: <Users size={18} /> },
    { path: '/add', label: 'Add Patient', icon: <UserPlus size={18} /> }
  ];

  return (
    <header className="sticky top-0 z-50 py-4 glass">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
            <Activity className="text-blue-400" size={24} />
          </div>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300"
          >
            MediCare
          </motion.span>
        </Link>

        <nav className="flex gap-2 isolate items-center">
          {isAuthenticated ? (
            <>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                
                return (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    className={`relative px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-slate-700/50 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {link.icon}
                    <span className="hidden sm:block">{link.label}</span>
                  </Link>
                );
              })}
              <button 
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:block">Logout</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
