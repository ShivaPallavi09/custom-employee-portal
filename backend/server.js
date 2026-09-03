require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, seedDatabase } = require('./src/models');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes')); // <--- UNCOMMENTED
app.use('/api/zoho', require('./src/routes/zohoRoutes'));

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Database connected and synchronized.');
    await seedDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Failed to sync database:', err));