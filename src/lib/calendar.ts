
import { googleCalendarConfig } from '../data/mock';

/**
 * Serviço de Integração com Google Calendar
 * Verifica se existem eventos (busy) em um dia específico.
 */

export const checkDateAvailability = async (dateString: string): Promise<{ available: boolean; message?: string }> => {
  const { apiKey, calendarId } = googleCalendarConfig;
  
  // SIMULAÇÃO / MOCK (Se não houver chaves configuradas)
  // Isso permite que o app funcione visualmente sem quebrar se o usuário não tiver configurado a API ainda.
  if (!apiKey || !calendarId) {
    console.warn("⚠️ Google Calendar API Key não configurada. Usando modo simulação.");
    
    // Simula um delay de rede (Cinematic Suspense)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Lógica Mock: Bloqueia aleatoriamente datas para demonstração (ex: dias pares indisponíveis)
    const day = new Date(dateString).getDate();
    // Vamos dizer que dia 15 e 20 estão sempre ocupados para teste
    if (day === 15 || day === 20) {
        return { available: false, message: "Agenda lotada neste dia." };
    }
    
    return { available: true };
  }

  // INTEGRAÇÃO REAL COM GOOGLE CALENDAR API
  try {
    const startDate = new Date(dateString);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(dateString);
    endDate.setHours(23, 59, 59, 999);

    const timeMin = startDate.toISOString();
    const timeMax = endDate.toISOString();

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true`;

    const response = await fetch(url);
    
    if (!response.ok) {
        // Se der erro (ex: chave inválida, calendário privado), tratamos como erro mas não bloqueamos o fluxo
        console.error("Erro ao consultar Google Calendar:", response.statusText);
        return { available: true, message: "Aviso: Não foi possível sincronizar agenda." }; 
    }

    const data = await response.json();
    
    // Se houver algum evento na lista 'items', consideramos o dia ocupado/com risco.
    // Para produções audiovisuais, geralmente 1 evento bloqueia a diária.
    if (data.items && data.items.length > 0) {
        return { available: false, message: "Data indisponível (Já reservada)." };
    }

    return { available: true };

  } catch (error) {
    console.error("Erro de conexão com Google Calendar:", error);
    // Em caso de erro de rede, permitimos prosseguir por segurança (fail-open) ou bloqueamos (fail-close)
    return { available: true }; 
  }
};
