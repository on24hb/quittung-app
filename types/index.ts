export type Status = 'consistent' | 'contradicted' | 'partial' | 'pending';

export interface Party {
  id: string;
  name: string;
  abbreviation: string;
  color: string;
  consistency_score: number;
  total_promises?: number;
  fulfilled_promises?: number;
}

export interface ReceiptData {
  id: string;
  title: string;
  topic: string;
  quote: string;
  status: Status;
  party_id: string;
  date: string;
  description?: string;
  politician_id?: string;
}

export interface Politician {
  id: string;
  full_name: string;
  party_id: string;
  position: string;
  wahlkreis?: string;
  fraktion?: string;
  ausschuss?: string[];
  portrait_url?: string;
  bundestag_email?: string;
  abgeordnetenwatch_url?: string;
  personal_consistency_score: number;
  party_loyalty_score: number;
  rebellion_count: number;
}

export interface Statement {
  id: string;
  politician_id: string;
  vote_id?: string;
  date: string;
  text: string;
  source: string;
  context?: string;
  // UI-spezifische Felder
  quote?: string;
  source_type?: string;
  source_url?: string;
  alignment?: 'consistent' | 'contradicted' | 'unclear';
}

export interface Vote {
  id: string;
  title: string;
  date: string;
  result: string;
  // Optional, da nicht immer vorhanden
  party_position?: 'yes' | 'no' | 'abstain';
}