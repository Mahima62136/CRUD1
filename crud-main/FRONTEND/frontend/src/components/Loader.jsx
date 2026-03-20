import { motion } from 'framer-motion';

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 border-4 border-slate-700 rounded-full"
        />
        <motion.div
          className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="w-2 h-2 bg-blue-400 rounded-full" />
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-slate-400 font-medium"
      >
        {text}
      </motion.p>
    </div>
  );
}
