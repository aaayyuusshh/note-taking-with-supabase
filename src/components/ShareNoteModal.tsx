import { useState } from 'react';

interface Props {
  noteId: string;
  onShare: (email: string) => void;
  onClose: () => void;
}

export default function ShareNoteModal({ noteId, onShare, onClose }: Props) {
  const [email, setEmail] = useState('');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Share Note</h2>
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={() => onShare(email)}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
