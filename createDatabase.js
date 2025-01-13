const { Client } = require('pg');

const createDatabase = async () => {
  // Connect to the default `postgres` database
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'nehaniket',
    database: 'postgres', // Default database
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully.');

    // Database creation SQL
    const databaseName = 'voteruser';
    await client.query(`CREATE DATABASE ${databaseName};`);
    console.log(`Database "${databaseName}" created successfully.`);
  } catch (err) {
    console.error('Error creating database:', err.message);
  } 
//   finally {
//     await client.end();
//     console.log('Connection closed.');
//   }
};

createDatabase();
