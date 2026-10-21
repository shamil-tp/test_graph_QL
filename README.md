# Student Management System - GraphQL API & React Client

A full-stack web application demonstrating a modern GraphQL implementation. This project uses **Apollo Server (Standalone)** with **Postgres.js** on the backend and **React + Apollo Client** on the frontend, built with Vite.

## 🚀 Features
- **GraphQL API:** Fully typed queries and mutations using Apollo Server.
- **Modern Database Driver:** Utilizes `postgres.js` with auto-camelCase transformation and ES6 tagged template literals (no raw SQL injection risks).
- **ES Modules:** Built entirely with Node.js ES Modules (`"type": "module"`).
- **Reactive UI:** React frontend with Apollo Client caching and automatic UI updates on mutation.
- **Vite Optimized:** Includes specific Vite configurations to handle Apollo Client ESM dependencies correctly.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** (ES Modules)
- **@apollo/server** (Standalone Mode)
- **GraphQL**
- **Postgres.js** (Modern PostgreSQL driver)

### Frontend
- **React 18**
- **Vite**
- **@apollo/client**

---

## 🗄️ Database Setup

1. Ensure you have PostgreSQL installed and running locally on port `5432`.
2. Create a database (e.g., `student_db`).
3. Run the following SQL script to create the table and seed initial data:

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  is_hosteler BOOLEAN DEFAULT false,
  mark NUMERIC(5, 2) NOT NULL,
  course VARCHAR(100) NOT NULL
);

-- Insert sample data
INSERT INTO students (name, is_hosteler, mark, course) 
VALUES ('Alex Smith', true, 88.5, 'Computer Science'),
       ('Maria Garcia', false, 92.0, 'Mathematics');
```

---

## ⚙️ Backend Setup

1. Navigate to your backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the database connection string in `db.js` with your PostgreSQL credentials:
   ```javascript
   export const sql = postgres('postgres://username:password@localhost:5432/student_db', {
     transform: postgres.camel, 
   });
   ```
4. Start the Apollo Standalone Server:
   ```bash
   node index.js
   ```
   *The server will run at `http://localhost:4000/`*

---

## 🖥️ Frontend Setup

1. Navigate to your Vite frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The UI will be available at `http://localhost:5173/`*

---

## 🐞 Troubleshooting Vite & Apollo Client

If you encounter the error `Uncaught SyntaxError: ... doesn't provide an export named: 'useMutation'`, it is due to Vite's dependency pre-bundler failing to parse Apollo's ESM exports. 

**The Fix:**
1. Ensure your `vite.config.js` includes `@apollo/client` in `optimizeDeps`:
   ```javascript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     optimizeDeps: {
       include: ['@apollo/client'],
     },
   });
   ```
2. Stop the Vite server and clear the cache by forcing a rebuild:
   ```bash
   npx vite --force
   ```

---

## 📝 GraphQL Schema

**Types:**
```graphql
type Student {
  id: ID!
  name: String!
  isHosteler: Boolean!
  mark: Float!
  course: String!
}
```

**Queries & Mutations:**
- `query { students { id name course mark isHosteler } }`
- `mutation { addStudent(name: "John", course: "CS", mark: 90, isHosteler: true) { id name } }`

---