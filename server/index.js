require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '🚀 Servidor corriendo correctamente' });
});

// Conectar DB e iniciar servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la DB exitosa');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🟢 Servidor en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error al conectar a la DB:', err));