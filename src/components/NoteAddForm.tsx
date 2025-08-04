import { useState } from 'react';

interface Props {
    onAdd: (content: string) => void
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
    <div className="flex gap-2 mb-4">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a note..."
        className="flex-1 border px-2 py-1"
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4">Add</button>
    </div>
  )
}
