import express from 'express';
import * as controllers from '../controllers/userControllers.js'; // Importa as funções de controle
import hashPassword from '../middlewares/auth.js'; // Importa o middleware de hashear senha
import requireOwner from '../middlewares/owner.js'; // Importa o middleware de verificar token

const router = express.Router(); // Cria um Router

// Rota para coletar dados do usuário
router.get('/:at', (req, res) => {
    const at = req.params.at;

    controllers.getUserByAt(req, res, at);
});

// Rota para atualizar quantidade de cliques do usuário
router.put('/:at/clicks', (req, res) => {
    const at = req.params.at;

    controllers.updateClicks(req, res, at);
});

// Rota para atualizar a quantidade de visualizações do usuário
router.put('/:at/views', (req, res) => {
    const at = req.params.at;

    controllers.updateViews(req, res, at);
});

// Rota para atualizar demais dados do usuário
router.put('/:at', requireOwner, (req, res) => {
    const bodyData = req.body;
    const at = req.params.at;

    controllers.updateUser(req, res, at, bodyData);
})

// Rota para criar usuário
router.post('/', hashPassword, (req, res) => {
    const bodyData = req.body;

    controllers.postUser(req, res, bodyData);
});

// Rota para deletar usuário
router.delete('/:at', requireOwner, (req, res) => {
    const at = req.params.at;

    controllers.deleteUser(req, res, at);
})

// Exporta o Router para ser usado no App.js
export default router