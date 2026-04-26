import express from 'express';
import * as controllers from '../controllers/authControllers.js' // Importa as funções de controle

const router = express.Router(); // Cria um Router

// Rota com método POST (usada para verificar senha)
// Essa função é de método POST, pois assim pode ler o body, o que é mais seguro que GET
router.post('/password/:at', (req, res) => {
    const at = req.params.at;
    const password = req.body.password;

    controllers.verifyPassword(req, res, at, password)
})

// Exporta o Router para ser usaddo em App.js
export default router;