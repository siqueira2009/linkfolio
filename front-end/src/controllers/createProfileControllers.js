import * as services from '../services/createProfileServices.js'

async function createProfile(req, res, name, bio, color, pronouns, at, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok, customLinks) {
    const response = await services.createProfile(name, pronouns, at, bio, color, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok, customLinks);

    if (!response) {
        res.status(500).json({"erro": "Erro ao criar perfil"})
    }

    res.redirect(`/u/${at}`)
}

export {
    createProfile
}