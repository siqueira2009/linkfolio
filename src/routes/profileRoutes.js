import express from 'express';
import * as controllers from '../controllers/profileControllers.js' // Importa funções de controle

const router = express.Router(); // Cria um Router

// Rota com método GET (pega os dados do usuário e carrega a página)
router.get('/:at', async (req, res) => {
    const at = req.params.at;

    await controllers.getUser(req, res, at); // Pega os dados do usuário
});

// Exporta o router para ser usado no app.js
export default router;