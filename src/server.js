require('dotenv').config();

const app = require('./app');
const connectMongoDB = require('./config/db');
const mysql = require('./config/mysql');

const PORT = process.env.PORT || 5000;

connectMongoDB();

mysql
  .execute('SELECT 1')
  .then(() => console.log('MySQL connected'))
  .catch((err) => console.error('MySQL connection failed:', err.message));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});