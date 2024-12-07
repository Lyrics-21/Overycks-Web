const god = require('./config/database'); // Asegúrate de importar el archivo correctamente

async function testConnection() {
  try {
    // Intentamos obtener una conexión del pool
    const connection = await god.getConnection();
    console.log('Successfully connected to the database');
    connection.release(); // Libera la conexión cuando termine
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
  }
}

testConnection();
