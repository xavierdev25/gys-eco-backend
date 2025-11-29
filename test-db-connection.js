const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456',
  database: 'gys_eco_db',
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Conexión exitosa a PostgreSQL!');
    const res = await client.query('SELECT NOW()');
    console.log('Hora del servidor:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
    console.error('Código de error:', err.code);
  }
}

testConnection();
