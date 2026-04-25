import * as services from '../services/userServices.js';

function getUserByAt(req, res, at) {
    const nedeedUser = services.getUserByAt(at);

    if (!nedeedUser) {
        res.status(404).json({"erro": "Usuário não encontrado"});
        return;
    }

    res.json(nedeedUser);
}

function updateViews(req, res, at) {
    const updateViews = services.updateViews(at)

    if (!updateViews) {
        res.status(500).json({"erro": "Erro ao atualizar visualizações"});
        return;
    }

    res.json({"mensagem": "Visualizações atualizadas"});
}

function updateClicks(req, res, at) {
    const updateClicks = services.updateClicks(at)

    if (!updateClicks) {
        res.status(500).json({"erro": "Erro ao atualizar cliques"});
        return;
    }

    res.json({"mensagem": "Cliques atualizados"});
}

function postUser(req, res, name, pronouns, at, bio, color, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok, links) {
    const id = services.postUser(name, pronouns, at, bio, color, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok, links);

    if (id == null || id == undefined) {
        res.status(500).json({"erro": "Não foi possível criar usuário"});
        return;
    } else if (id == "duplicated") {
        res.status(500).json({"erro": "Usuário com esse arroba já existe"});
        return;
    }

    res.json({"mensagem": `Usuário @${at} criado com sucesso`})
}

function deleteUser(req, res, at) {
    const success = services.deleteUser(at);

    if (success == -1) {
        res.status(500).json({"erro": "Não foi possível deletar usuário"});
        return;
    }

    res.json({"mensagem": `Usuário @${at} deletado com sucesso`});
}

export {
    getUserByAt,
    postUser,
    deleteUser,
    updateViews,
    updateClicks
}