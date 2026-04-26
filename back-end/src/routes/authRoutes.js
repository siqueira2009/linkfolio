import express from 'express';
import * as controllers from '../controllers/authControllers.js'

const router = express.Router();

router.post('/password/:at', (req, res) => {
    const at = req.params.at;
    const password = req.body.password;

    controllers.verifyPassword(req, res, at, password)
})

export default router;