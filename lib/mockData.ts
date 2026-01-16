import { Party, ReceiptData, Politician, Statement, Vote } from "@/types";

// --- Parteien ---
export const parties: Party[] = [
  { 
    id: '1', 
    name: 'Bündnis 90/Die Grünen', 
    abbreviation: 'Grüne', 
    color: '#46962b', 
    consistency_score: 82,
    total_promises: 145,
    fulfilled_promises: 118 
  },
  { 
    id: '2', 
    name: 'Freie Demokratische Partei', 
    abbreviation: 'FDP', 
    color: '#ffed00', 
    consistency_score: 65, 
    total_promises: 120,
    fulfilled_promises: 78
  },
  { 
    id: '3', 
    name: 'Sozialdemokratische Partei', 
    abbreviation: 'SPD', 
    color: '#e3000f', 
    consistency_score: 71, 
    total_promises: 200,
    fulfilled_promises: 142
  },
  { 
    id: '4', 
    name: 'Christlich Demokratische Union', 
    abbreviation: 'CDU', 
    color: '#151515', 
    consistency_score: 58, 
    total_promises: 180,
    fulfilled_promises: 104
  },
];

// --- Quittungen ---
export const receipts: ReceiptData[] = [
  {
    id: 'r1',
    title: "Diesel-Privileg abschaffen",
    topic: "Klima",
    quote: "Wir werden klimaschädliche Subventionen abbauen.",
    status: "contradicted",
    party_id: '1',
    date: "2021-09-20",
    description: "Trotz Wahlversprechen wurde im Haushaltskompromiss das Dieselprivileg für Landwirte zunächst beibehalten."
  },
  {
    id: 'r2',
    title: "Keine Steuererhöhungen",
    topic: "Finanzen",
    quote: "Es wird mit mir keine Steuererhöhungen geben.",
    status: "consistent",
    party_id: '2',
    date: "2021-08-15",
    description: "Alle Anträge auf Steuererhöhungen wurden blockiert."
  },
  {
    id: 'r3',
    title: "12 Euro Mindestlohn",
    topic: "Soziales",
    quote: "Wir erhöhen den Mindestlohn im ersten Jahr auf 12 Euro.",
    status: "consistent",
    party_id: '3',
    date: "2021-05-10"
  },
  {
    id: 'r4',
    title: "Digitalpakt 2.0",
    topic: "Bildung",
    quote: "Schulen müssen ans schnelle Netz.",
    status: "partial",
    party_id: '4',
    date: "2022-01-10",
    description: "Gelder wurden bewilligt, fließen aber nur langsam ab."
  }
];

// --- Politiker ---
export const politicians: Politician[] = [
  {
    id: 'p1',
    full_name: 'Annalena Baerbock',
    party_id: '1', // Grüne
    position: 'Bundesaußenministerin',
    wahlkreis: 'Potsdam',
    fraktion: 'Bündnis 90/Die Grünen',
    ausschuss: ['Auswärtiger Ausschuss'],
    personal_consistency_score: 88,
    party_loyalty_score: 95,
    rebellion_count: 2,
    portrait_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200' 
  },
  {
    id: 'p2',
    full_name: 'Christian Lindner',
    party_id: '2', // FDP
    position: 'Bundesfinanzminister',
    wahlkreis: 'Rheinisch-Bergischer Kreis',
    fraktion: 'FDP',
    ausschuss: ['Finanzausschuss'],
    personal_consistency_score: 72,
    party_loyalty_score: 98,
    rebellion_count: 1,
    portrait_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200' 
  }
];

// --- Abstimmungen ---
export interface EnhancedVote extends Vote {
    party_position?: 'yes' | 'no' | 'abstain';
}

export const votes: EnhancedVote[] = [
  { id: 'v1', title: 'Sondervermögen Bundeswehr', date: '2022-06-03', result: 'Angenommen', party_position: 'yes' },
  { id: 'v2', title: 'Gebäudeenergiegesetz', date: '2023-09-08', result: 'Angenommen', party_position: 'yes' }
];

// --- Aussagen ---
export const statements: Statement[] = [
  {
    id: 's1',
    politician_id: 'p1',
    vote_id: 'v1',
    date: '2022-02-27',
    quote: "Wir brauchen eine feministische Außenpolitik, keine Aufrüstung.", 
    text: "Wir brauchen eine feministische Außenpolitik, keine Aufrüstung.",
    source: "Wahlkampfrede 2021",
    source_type: "Wahlkampf_Rede",
    source_url: "#",
    alignment: "contradicted" 
  },
  {
    id: 's2',
    politician_id: 'p2',
    vote_id: 'v2',
    date: '2023-05-15',
    quote: "Technologieoffenheit muss im Gesetz verankert sein.",
    text: "Technologieoffenheit muss im Gesetz verankert sein.",
    source: "Interview Welt",
    source_type: "Interview",
    alignment: "consistent"
  }
];