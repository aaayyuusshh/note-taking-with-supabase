require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// body: { noteId: string, email: string }
app.post('/share-note', async (req, res) => {
  const { noteId, email } = req.body;

  if (!noteId || !email) {
    return res.status(400).json({ error: 'Missing noteId or email' });
  }

  const { data: users, error: usersError } = await supabase.auth.admin.listUsers();

  if (usersError) {
    console.error('Error listing users:', usersError);
    return res.status(500).json({ error: 'Error fetching users' });
  }

  const user = users.users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { error: insertError } = await supabase
    .from('note_collaborators')
    .insert({
      note_id: noteId,
      user_id: user.id,
      role: 'editor'
    });

  if (insertError) {
    console.error('Error adding collaborator:', insertError);
    return res.status(500).json({ error: 'Error adding collaborator' });
  }

  res.json({ message: 'Note shared successfully!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
