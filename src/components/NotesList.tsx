import type { Note } from '../types/Note';

interface Props {
    notes: Note[],
    onDelete: (id: string) => void
}

export default function NotesList({ notes, onDelete }: Props) {
	return (
    <ul className="space-y-2">
			{notes.map((note) => (
					<li key={note.id} className="flex justify-between items-center border p-2">
						{note.content}
						<button onClick={() => onDelete(note.id)} className="text-red-600">Delete</button>
					</li>
			))}
    </ul>
	)
}
