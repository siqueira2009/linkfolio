import express from 'express';
import cors from 'cors';

// Importa os Routers
import userRouter from './src/routes/userRoutes.js';
import authRouter from './src/routes/authRoutes.js'

// Cria o app Express
const app = express();

// Define algumas coisas
app.use(cors({ origin: 'http://localhost:3001' })); // Permite que 'localhost:3001' acesse a API
app.use(express.json()); // Permite a leitura de bodies JSON
app.use(express.urlencoded({ extended: true })); // Permite a leitura de bodies HTML

// Pega as rotas e redireciona para os routers
app.use('/user', userRouter);
app.use('/auth', authRouter)

// Faz o servidor ouvir (ficar de pé)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor BACK-END iniciado em localhost:${PORT}`);
});