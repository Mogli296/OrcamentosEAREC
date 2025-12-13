import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { formatCurrency } from '../../lib/utils';

interface AnimatedPriceProps {
  value: number;
  className?: string;
}

/**
 * Componente que anima o valor numérico usando Motion Values.
 * Cria o efeito de "rolagem" de números de cassino/banco.
 */
const AnimatedPrice: React.FC<AnimatedPriceProps> = ({ value, className }) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => formatCurrency(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
};

export default AnimatedPrice;