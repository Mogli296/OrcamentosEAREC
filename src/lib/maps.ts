
/**
 * Biblioteca de Mapas e Geolocalização
 * ------------------------------------
 * Responsável por converter endereços em coordenadas e calcular distâncias.
 */

// Coordenadas fixas da Origem: EAREC Estúdio, Goianinha - RN
const ORIGIN_COORDS = {
    lat: -6.2662, // Latitude aproximada de Goianinha
    lon: -35.2227 // Longitude aproximada de Goianinha
};

/**
 * Calcula a distância estimada de condução entre a origem (Goianinha) e o destino.
 * Utiliza a API pública do OpenStreetMap (Nominatim) para obter coordenadas.
 * 
 * @param destination String do endereço de destino (ex: "Natal, RN")
 * @returns Distância em KM (number)
 */
export async function calculateDistance(destination: string): Promise<number> {
    const cleanDest = destination.trim();
    if (!cleanDest || cleanDest.length < 3) return 0;

    try {
        // Adicionamos ", Brasil" para enviesar a busca para o contexto local caso o usuário não especifique
        const query = cleanDest.toLowerCase().includes('brasil') ? cleanDest : `${cleanDest}, Brasil`;
        
        // Requisição para API de Geocoding do OpenStreetMap (Gratuita)
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
        
        if (!response.ok) return 0;
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            const destLat = parseFloat(data[0].lat);
            const destLon = parseFloat(data[0].lon);
            
            // Cálculo da Distância em Linha Reta (Haversine Formula)
            const straightDistance = getHaversineDistance(
                ORIGIN_COORDS.lat, 
                ORIGIN_COORDS.lon, 
                destLat, 
                destLon
            );

            // FATOR DE CORREÇÃO DE ROTA (TORTUOSIDADE)
            // A distância de carro é geralmente ~30-40% maior que a linha reta.
            const drivingFactor = 1.35;
            
            return Math.round(straightDistance * drivingFactor);
        }
    } catch (error) {
        console.error("Erro ao calcular distância:", error);
        return 0; // Retorna 0 em caso de falha silenciosa (mantém o app funcionando)
    }

    return 0;
}

/**
 * Fórmula de Haversine para calcular distância entre dois pontos no globo.
 */
function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(value: number): number {
    return value * Math.PI / 180;
}
