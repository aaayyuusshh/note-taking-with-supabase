# Supabase Notes 🗒️
A minimal, modern note-taking app.

This project was made for learning purposes only; to quickly learn and demonstrate my ability to work with BaaS(Supabase) for authentication, database management, and secure note sharing.

----

## 🚀 Features
- User Authentication – Email/password login and signup with Supabase
- Secure Sessions – Authenticated notes per user
- Create & Delete Notes – Simple note management
- Note Sharing – Share notes with other users (view-only access)
- Role-based Access – Owners vs. collaborators with policies enforced at the database level
- Express Backend – Uses Supabase service key securely for admin access for sharing functionality
- Modern UI – Aesthetic and responsive interface with TailwindCSS and React best practices

## 🛠️ Tech Stack

- Frontend: React (TypeScript), TailwindCSS
- Backend: Express.js (Node.js)
- Database & Auth: Supabase (PostgreSQL with Row Level Security)

## 🏘️ Architecture
<img width="853" height="667" alt="Screenshot 2025-08-04 at 5 18 19 PM" src="https://github.com/user-attachments/assets/d5d7dbbf-1d38-4fa5-8497-d4f54d8e5ecf" />

> Frontend communicates directly with Supabase for all functionality, except for note sharing. Since note sharing requires us to retrieve other users' info, which requires admin privileges, it has to be handled through a secure backend, per Superbase policy.

## 📊 Database schema 
 <img width="853" height="443" alt="Screenshot 2025-08-04 at 4 17 31 PM" src="https://github.com/user-attachments/assets/49df02fd-3661-47e0-a996-8964eb4bca1c" />
