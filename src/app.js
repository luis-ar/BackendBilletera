const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importa el módulo CORS
const apiRoutes = require("./routes/apiRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Habilita CORS para todos los orígenes (¡Cuidado en producción!)
app.use(cors());

app.use(bodyParser.json());
app.use(apiRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
