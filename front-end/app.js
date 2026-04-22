import express from 'express';
import { fileURLToPath } from "url";
import path from 'path';

import user from './src/routes/profileRoutes.js';
import createProfile from './src/routes/createRoutes.js'

// Cria o servidor
const app = express();

// Configura o "path.join"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para parsear dados do formulário e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pasta views e public
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Pega as rotas e redireciona para os routers
app.use('/u', user);
app.use('/create', createProfile);

// Para rota inexistente
app.use('/', (req, res) => {
    res.redirect('/create')
})

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    mensagem: `A rota ${req.method} ${req.originalUrl} não existe.`,
  });
});

const PORT = 3001;

// Faz o servidor ouvir (ficar de pé)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor FRONT-END iniciado em localhost:${PORT}`);
})
