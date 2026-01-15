interface TopicChipsProps {
  selectedTopic: string | null;
  onSelect: (topic: string | null) => void;
}

const TOPICS = ['Klima', 'Finanzen', 'Soziales', 'Bildung'];

export default function TopicChips({ selectedTopic, onSelect }: TopicChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedTopic === null 
            ? 'bg-slate-900 text-white shadow-md' 
            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
        }`}
      >
        Alle
      </button>
      {TOPICS.map((topic) => (
        <button
          key={topic}
          onClick={() => onSelect(topic === selectedTopic ? null : topic)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedTopic === topic
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}