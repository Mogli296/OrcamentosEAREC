/**
 * Módulo de Segurança
 * -------------------
 * Responsável pela validação de credenciais de forma simplificada.
 */

/**
 * Verifica se a senha fornecida corresponde à senha mestre.
 * Senha definida: "XINGU" (Case insensitive)
 * @param input Senha em texto plano digitada pelo usuário.
 */
export const verifyPassword = async (input: string): Promise<boolean> => {
  if (!input) return false;
  // Comparação simples e direta conforme solicitado
  return input.toUpperCase().trim() === "XINGU";
};

/**
 * Gera um delay artificial para prevenir Timing Attacks rudimentares e melhorar UX.
 */
export const securityDelay = () => new Promise(resolve => setTimeout(resolve, 800));