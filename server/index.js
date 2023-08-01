const server = require('./src/app.js');
require('dotenv').config();

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3001;

try {
  server.listen(PORT, HOST, () => {
    console.log(`Server raised in: http://localhost:${PORT}`);
  })
} catch (error) {
  console.log(error);
}
