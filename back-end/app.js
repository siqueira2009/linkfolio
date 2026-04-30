// Importa as dependências
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Importa os Routers
import userRouter from './src/routes/userRoutes.js';
import authRouter from './src/routes/authRoutes.js'

// Cria o app Express
const app = express();

// Pega a URL do frontend nas variáveis do sistema
const FRONTEND_URL = process.env.FRONTEND_URL;

// Define algumas coisas
app.use(cors({ // Permite que o front-end acesse a API
    origin: FRONTEND_URL,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Permite a leitura de bodies JSON
app.use(express.urlencoded({ extended: true })); // Permite a leitura de bodies HTML

// Pega as rotas e redireciona para os routers
app.use('/user', userRouter);
app.use('/auth', authRouter)

// Faz o servidor ouvir (ficar de pé)
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor BACK-END iniciado na porta ${PORT}`);
});