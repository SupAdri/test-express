const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir archivos estáticos (cliente)
app.use(express.static('public'));

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Enviar mensaje de bienvenida
  ws.send(JSON.stringify({ type: 'welcome', message: 'Conexión establecida' }));

  // Recibir mensajes del cliente
  ws.on('message', (data) => {
    const msg = data.toString();
    console.log('Mensaje recibido:', msg);

    // Reenviar a todos los clientes (broadcast)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'broadcast', message: msg }));
      }
    });
  });

  ws.on('close', () => console.log('Cliente desconectado'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));



// const express = require('express');

// const path = require('path');
// const app = express();
// const PORT = 3000;

// app.use(express.json());

// var pinga = {
//     nombre: "Maso",
//     gei:"si"
// }

// app.get('/api', (req, res) => {
//   res.send(pinga);
// });

// app.post('/api/algo',(req,res)=>{
//   console.log(req.body)
//   res.send(req.body)
// })
// app.get('/api/mas', (req, res) => {
//   pinga.gei = 'nooooooo'
//   res.send(pinga);
// });

// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });

// app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });