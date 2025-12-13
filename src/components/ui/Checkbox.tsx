import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { CheckboxProps } from '../../types';

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <div 
      className="flex items-center gap-3 cursor-pointer group select-none"
      onClick={() => onChange(!checked)}
    >
      <div className={cn(
        "w-6 h-6 rounded border transition-all duration-300 flex items-center justify-center",
        checked 
          ? "bg-brand-DEFAULT border-brand-DEFAULT shadow-[0_0_10px_rgba(220,38,38,0.5)]" 
          : "bg-transparent border-white/30 group-hover:border-white/60"
      )}>
        <motion.div
          initial={false}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Check size={14} className="text-white stroke-[3px]" />
        </motion.div>
      </div>
      {label && <span className="text-neutral-300 group-hover:text-white transition-colors">{label}</span>}
    </div>
  );
};

export default Checkbox;