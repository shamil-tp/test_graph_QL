import postgres from 'postgres';

export const sql = postgres('postgres://postgres:urcx5298@localhost:5432/postgres', {
  transform: postgres.camel, // Automatically converts is_hosteler -> isHosteler
});