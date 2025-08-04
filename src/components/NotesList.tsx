import type { Note } from '../types/Note';

interface Props {
  notes: Note[];
  onDelete: (id: string) => void;
  onShare:(id: string) => void;
}

export default function NotesList({ notes, onDelete, onShare }: Props) {
  return (
    <ul className="space-y-3">
      {notes.length === 0 && (
        <p className="text-gray-500 text-center mt-8">No notes yet. Add one above!</p>
      )}
      {notes.map((note) => (
        <li
          key={note.id}
          className="flex justify-between items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4"
        >
          <p className="text-gray-800 break-words">{note.content}</p>
          <button
            onClick={() => onDelete(note.id)}
            aria-label="Delete note"
            className="text-red-500 hover:text-red-700 transition ml-4"
          >
            🗑️
          </button>
          <button
            onClick={() => onShare(note.id)}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            🔗
          </button>
        </li>
      ))}
    </ul>
  );
}
