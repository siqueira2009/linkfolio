import express from 'express';
import { fileURLToPath } from "url";
import path from 'path';

import user from './src/routes/profile.js';
import createProfile from './src/routes/create_profile.js'

// Cria o servidor
const app = express();

// Configura o "path.join"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pasta views e public
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Pega as rotas e redireciona para os routers
app.get('/u/:user', user);
app.get('/create', createProfile);

// Faz o servidor ouvir (ficar de pé)
app.listen(3000, '0.0.0.0', () => {
    console.log("✅ Servidor iniciado em localhost:3000!");
})
