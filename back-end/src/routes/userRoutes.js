import express from 'express';
import * as controllers from '../controllers/userControllers.js';
import hashPassword from '../middlewares/auth.js';

const router = express.Router();

router.get('/:at', (req, res) => {
    const at = req.params.at;

    controllers.getUserByAt(req, res, at);
});

router.put('/:at/clicks', (req, res) => {
    const at = req.params.at;

    controllers.updateClicks(req, res, at);
});

router.put('/:at/views', (req, res) => {
    const at = req.params.at;

    controllers.updateViews(req, res, at);
});

router.put('/:at', (req, res) => {
    const bodyData = req.body;
    const at = req.params.at;

    controllers.updateUser(req, res, at, bodyData);
})

router.post('/', hashPassword, (req, res) => {
    const bodyData = req.body;

    controllers.postUser(req, res, bodyData);
});

router.delete('/:at', (req, res) => {
    const at = req.params.at;

    controllers.deleteUser(req, res, at);
})

export default router