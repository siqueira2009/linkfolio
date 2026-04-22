import express from 'express';
import userRouter from './src/routes/userRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`✅ Servidor BACK-END iniciado em localhost:${PORT}`);
});