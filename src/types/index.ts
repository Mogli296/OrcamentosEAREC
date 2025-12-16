
// Definições de Entidades do Sistema

export type LocationType = 'studio' | 'external';
export type OccasionType = 'institutional' | 'advertising' | 'social' | 'custom';

// Categorias principais baseadas na nova tabela
export type ServiceCategory = 'social' | 'commercial' | 'studio' | 'video_production' | 'custom';

// IDs específicos dos serviços
export type ServiceId = 
  | 'birthday' | 'fifteen' | 'graduation' 
  | 'wedding_base' | 'wedding_classic' | 'wedding_romance' | 'wedding_essence'
  | 'comm_photo' | 'comm_video' | 'comm_combo'
  | 'studio_photo' | 'studio_video'
  | 'edit_only' | 'cam_cap' | 'mobile_cap' | 'drone'
  | 'custom_project';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  isIncluded?: boolean;
  type: 'fixed' | 'variable_photo' | 'variable_video';
}

export interface ClientData {
  name: string;
  location: string;
  date: string;
  contact: string;
  company?: string;
  projectTitle?: string;
}

export interface QuoteData {
  id: string;
  client: ClientData;
  date: string;
  validUntil: string;
  basePrice: number; 
  studioFee: number;
  photoUnitPrice: number;
  videoUnitPrice: number;
  pricePerKm: number;
  items: ServiceItem[];
  moodboardImages: string[];
}

// Props Types
export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  price?: number;
}
