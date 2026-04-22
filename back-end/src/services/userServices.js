import fs from 'fs';
import { UserModel, SocialsModel } from '../models/userModels.js'

const jsonTaskPath = 'src/data/users.json';

var users = [];

try {
    const data = fs.readFileSync(jsonTaskPath, 'utf-8');
    users = JSON.parse(data);
    if (!Array.isArray(users)) users = [];
} catch (err) {
    console.log("Erro ao ler arquivo JSON, criando novo: " + err);
    fs.writeFileSync(jsonTaskPath, "[]", 'utf-8');
    users = [];
}

let idCounter = users.length;

function updateJSON() {
    try {
        fs.writeFileSync(jsonTaskPath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (err) {
        console.log('Erro ao editar arquivo JSON: ' + err);
    }
};

function getAt(user) {
    return user.at;
}

function getUserByAt(at) {
    const nedeedUser = users.find(u => u.at == at);

    return nedeedUser;
}

function postUser(name, pronouns, at, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok, links) {
    const allAts = users.map(getAt);

    if (allAts.includes(at)) {
        return "duplicated"
    }

    const userDetails = new UserModel(idCounter, name, pronouns, at);
    const userSocials = new SocialsModel(instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok);
    const userLinks = Array.isArray(JSON.parse(links)) ? JSON.parse(links) : [];
    const newUser = {...userDetails, ...userSocials};
    console.log('Links recebidos:', userLinks);

    newUser.links = userLinks;

    users.push(newUser);
    updateJSON();
    idCounter++;
    return newUser.id;
}

function deleteUser(at) {
    const index = users.findIndex(u => u.at == at);

    users.splice(index, 1);
    updateJSON();

    return index;
}

export {
    getUserByAt,
    postUser,
    deleteUser
}