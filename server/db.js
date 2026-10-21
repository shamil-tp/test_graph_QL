import postgres from 'postgres';

export const sql = postgres('postgres://username:password@localhost:5432/your_db_name', {
  transform: postgres.camel, // Automatically converts is_hosteler -> isHosteler
});