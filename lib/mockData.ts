import { Party, ReceiptData, Politician, Statement, Vote} from "@/types";

export const parties: Party[] = [
  { id: '1', name: 'Bündnis 90/Die Grünen', abbreviation: 'Grüne', color: '#46962b', consistency_score: 82 },
  { id: '2', name: 'Freie Demokratische Partei', abbreviation: 'FDP', color: '#ffed00', consistency_score: 65 },
  { id: '3', name: 'Sozialdemokratische Partei', abbreviation: 'SPD', color: '#e3000f', consistency_score: 71 },
  { id: '4', name: 'Christlich Demokratische Union', abbreviation: 'CDU', color: '#151515', consistency_score: 58 },
];

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
    rebellion_count: 2
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
    rebellion_count: 1
  }
];

export const votes: Vote[] = [
  { id: 'v1', title: 'Abstimmung über Sondervermögen Bundeswehr', date: '2022-06-03', result: 'Angenommen' },
  { id: 'v2', title: 'Abstimmung über Gebäudeenergiegesetz', date: '2023-09-08', result: 'Angenommen' }
];

export const statements: Statement[] = [
  {
    id: 's1',
    politician_id: 'p1',
    vote_id: 'v1',
    date: '2022-02-27',
    text: "Wir brauchen eine feministische Außenpolitik, keine Aufrüstung.",
    source: "Wahlkampfrede 2021",
    context: "Vor dem Kriegsausbruch in der Ukraine."
  }
];