export type Status = 'consistent' | 'contradicted' | 'partial' | 'pending';

export interface Party {
  id: string;
  name: string;
  abbreviation: string;
  color: string;
  consistency_score: number;
}

export interface ReceiptData {
  id: string;
  title: string;
  topic: string;
  quote: string;
  status: Status;
  party_id: string;
  date: string;
  description?: string; // Erklärungstext für Details
}

export interface Politician {
  id: string;
  full_name: string;
  party_id: string;
  position: string; // z.B. "MdB", "Bundeskanzler"
  wahlkreis?: string;
  fraktion?: string;
  ausschuss?: string[];
  portrait_url?: string; // URL zum Bild
  bundestag_email?: string;
  abgeordnetenwatch_url?: string;
  personal_consistency_score: number;
  party_loyalty_score: number;
  rebellion_count: number;
}

export interface Statement {
  id: string;
  politician_id: string;
  vote_id?: string; // Verknüpfung zur Abstimmung
  date: string;
  text: string;
  source: string;
  context: string;
}

export interface Vote {
  id: string;
  title: string;
  date: string;
  result: string; // "Angenommen", "Abgelehnt"
}