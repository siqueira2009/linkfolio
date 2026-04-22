import * as services from '../services/userServices.js';

function getUserByUser(req, res, user) {
    const nedeedUser = services.getUserByUser(user);

    if (!nedeedUser) {
        res.status(404).json({"erro": "Usuário não encontrado!"});
        return;
    }

    res.json(nedeedUser);
}

function postUser(req, res, name, user, at, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok) {
    const id = services.postUser(name, user, at, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok);

    if (!user) {
        res.status(500).json({"erro": "Não foi possível criar usuário!"});
        return;
    }

    res.send(id);
}

export {
    getUserByUser,
    postUser
}