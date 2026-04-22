import express from 'express';
import userRouter from './src/routes/userRoutes.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log("✅ Servidor iniciado!");
});