export interface OrderRecord {
  id: string;
  name: string;
  contact: string;
  edit_type: string;
  edit_style: string;
  minutes: number;
  total_price_mmk: number;
  description: string;
  file_reference: string;
  file_size: number;
  file_path?: string;
  telegram_status: 'sent' | 'pending_chat_id' | 'failed' | 'simulated';
  telegram_error?: string;
  timestamp: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  specs: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  duration: string;
  aspect: string;
  description: string;
  image: string;
  beforeLabel: string;
  afterLabel: string;
  beforeDescription: string;
  afterDescription: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  project: string;
  year: string;
}
