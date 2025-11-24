const express = require('express');
const app = express();
const PORT = 3000;

var pinga = {
    nombre: "Maso",
    gei:"si"
}

app.get('/api', (req, res) => {
  res.send(pinga);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});