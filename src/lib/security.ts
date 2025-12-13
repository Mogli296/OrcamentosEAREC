/**
 * Módulo de Segurança
 * -------------------
 * Responsável pela criptografia e validação de credenciais.
 * Utiliza a API nativa de criptografia do navegador (SubtleCrypto) para segurança máxima.
 */

// Hash SHA-256 da senha mestre "xingu".
// Gerado externamente para não expor a string original no código.
const MASTER_HASH = "c72d63f03b4130638531d044949576a8d052b123652c77d242485121332a6136";

/**
 * Verifica se a senha fornecida corresponde ao hash armazenado.
 * @param input Senha em texto plano digitada pelo usuário.
 */
export const verifyPassword = async (input: string): Promise<boolean> => {
  if (!input) return false;

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    // Gera o hash SHA-256 da entrada
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Converte o buffer para string Hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Comparação segura (timing-safe seria ideal no backend, aqui comparamos strings)
    return hashHex === MASTER_HASH;
  } catch (error) {
    console.error("Erro de criptografia:", error);
    return false;
  }
};

/**
 * Gera um delay artificial para prevenir Timing Attacks rudimentares.
 */
export const securityDelay = () => new Promise(resolve => setTimeout(resolve, 800));