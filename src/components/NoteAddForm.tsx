import { useState } from 'react';

interface Props {
  onAdd: (content: string) => void;
}

export default function NoteAddForm({ onAdd }: Props) {
  const [content, setContent] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd(content);
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a note..."
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md px-6 py-2 transition cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}
