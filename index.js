const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Si usas SPA (React/Vue/Angular compilado en public), redirige todas las rutas al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var pinga = {
    nombre: "Maso",
    gei:"si"
}

app.get('/api', (req, res) => {
  res.send(pinga);
});

app.get('/api/mas', (req, res) => {
  pinga.gei = 'nooooooo'
  res.send(pinga);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});