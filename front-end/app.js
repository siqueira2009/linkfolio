import 'dotenv/config'
import express from 'express';
import { fileURLToPath } from "url";
import path from 'path';

// Importa os Routers
import user from './src/routes/profileRoutes.js';
import createProfile from './src/routes/createRoutes.js'

// Pega a URL do backend nas variáveis do sistema
const BACKEND_URL = process.env.BACKEND_URL;

// Cria o servidor
const app = express();

// Configura o "path.join"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para parsear dados do formulário e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.locals.backendUrl = BACKEND_URL;
  next();
})

// Pasta views e public
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Pega as rotas e redireciona para os routers
app.use('/u', user);
app.use('/create', createProfile);

// Para a rota padrão (/)
app.use('/', (req, res) => {
    res.redirect('/create')
})

// Para quando a rota não existe
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    mensagem: `A rota ${req.method} ${req.originalUrl} não existe.`,
  });
});


// Faz o servidor ouvir (ficar de pé)
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor FRONT-END iniciado em localhost:${PORT}`);
})
