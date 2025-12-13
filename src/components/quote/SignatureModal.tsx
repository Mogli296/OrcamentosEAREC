import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SignatureCanvas from 'react-signature-canvas';
import { X, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import { modalVariants } from '../../lib/animations';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (signatureData: string) => void;
  totalValue: string;
}

const SignatureModal: React.FC<SignatureModalProps> = ({ isOpen, onClose, onConfirm, totalValue }) => {
  const sigPad = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clear = () => {
    sigPad.current?.clear();
    setIsEmpty(true);
  };

  const handleEndDrawing = () => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      setIsEmpty(false);
    }
  };

  const handleConfirm = async () => {
    if (isEmpty || !sigPad.current) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    
    const dataUrl = sigPad.current.toDataURL();
    onConfirm(dataUrl);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-neutral-900 border border-white/10 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl text-white">Approve Proposal</h3>
                <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6 space-y-2">
                <p className="text-sm text-neutral-400">Ao assinar, você concorda com o valor total de:</p>
                <p className="text-3xl text-white font-sans font-medium">{totalValue}</p>
              </div>

              {/* Canvas Area */}
              <div className="relative border border-white/20 rounded-lg bg-white/5 overflow-hidden mb-4">
                <SignatureCanvas 
                  ref={sigPad}
                  penColor="white"
                  canvasProps={{
                    className: "w-full h-48 cursor-crosshair"
                  }}
                  onEnd={handleEndDrawing}
                />
                {!isEmpty && (
                  <button 
                    onClick={clear}
                    className="absolute top-2 right-2 text-xs text-neutral-400 hover:text-white bg-black/50 px-2 py-1 rounded"
                  >
                    Limpar
                  </button>
                )}
                {isEmpty && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-white/10 select-none">
                    <span className="font-serif italic text-2xl">Assine aqui</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1"
                  disabled={isEmpty || isSubmitting}
                  onClick={handleConfirm}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Confirmar Contratação"
                  )}
                </Button>
              </div>
            </div>
            
            {/* Decorative bottom line */}
            <div className="h-1 w-full bg-gradient-to-r from-neutral-900 via-brand-DEFAULT to-neutral-900" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SignatureModal;