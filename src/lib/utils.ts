import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilitário para combinar classes Tailwind de forma segura (merge de conflitos).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatador de moeda BRL (Real Brasileiro).
 * Estilo "Contábil" limpo para interfaces financeiras.
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Delay assíncrono para simular loading ou steps de animação
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
