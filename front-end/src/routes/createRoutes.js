import express from 'express';
import * as controllers from '../controllers/createProfileControllers.js'; // Importa funções de controle

const router = express.Router(); // Cria um router

// Rota com método GET (carrega página)
router.get('/', (req, res) => {
    res.render('pages/createProfile.ejs');
});

// Rota com método POST (envia para o back-end)
router.post('/', async (req, res) => {
    const bodyData = req.body;

    controllers.createProfile(req, res, bodyData);
})

// Exporta o router para ser usado no app.js
export default router;