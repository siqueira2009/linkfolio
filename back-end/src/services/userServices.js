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
        for (let i = 0; i < users.length; i++) {
            const userKeys = Object.keys(users[i]);
            const userValues = Object.values(users[i]);

            for (let j = 0; j < userKeys.length; j++) {
                if (typeof(userValues[j]) == "string") {
                    users[i][userKeys[j]] = userValues[j].trim();
                }
            }
        }

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

function updateViews(at) {
    const nedeedUser = users.find(u => u.at == at);

    nedeedUser.views = nedeedUser.views + 1;

    updateJSON();
    return nedeedUser;
}

function updateClicks(at) {
    const nedeedUser = users.find(u => u.at == at);

    nedeedUser.clicks = nedeedUser.clicks + 1;

    updateJSON();
    return nedeedUser;
}

function updateUser(at, bodyData) {
    const neededUserIndex = users.findIndex(u => u.at == at);
    const userId = users.find(u => u.at == at).id;
    const userPassword = users.find(u => u.at == at).password;

    users.splice(neededUserIndex, 1);

    const userDetails = new UserModel(userId, bodyData.name, bodyData.pronouns, at, bodyData.bio, userPassword, bodyData.color);
    const userSocials = new SocialsModel(bodyData.instagram, bodyData.linkedin, bodyData.x, bodyData.github, bodyData.youtube, bodyData.discord, bodyData.steam, bodyData.facebook, bodyData.tiktok);
    const userLinks = Array.isArray(bodyData.links) ? bodyData.links : [];
    const newUser = {...userDetails, ...userSocials};

    newUser.links = userLinks;

    users.splice(neededUserIndex, 0, newUser);
    updateJSON();
    return newUser.id;
}

function postUser(bodyData) {
    const allAts = users.map(getAt);

    if (allAts.includes(bodyData.at)) {
        return "duplicated"
    }

    const userDetails = new UserModel(idCounter, bodyData.name, bodyData.pronouns, bodyData.at, bodyData.bio, bodyData.password, bodyData.color);
    const userSocials = new SocialsModel(bodyData.instagram, bodyData.linkedin, bodyData.x, bodyData.github, bodyData.youtube, bodyData.discord, bodyData.steam, bodyData.facebook, bodyData.tiktok);
    const userLinks = Array.isArray(bodyData.links) ? bodyData.links : [];
    const newUser = {...userDetails, ...userSocials};

    newUser.links = userLinks;

    users.push(newUser);
    updateJSON();
    idCounter++;
    return newUser.id;
}

function deleteUser(at) {
    const index = users.findIndex(u => u.at == at);

    idCounter--;
    users.splice(index, 1);
    updateJSON();

    return index;
}

export {
    getUserByAt,
    postUser,
    deleteUser,
    updateViews,
    updateClicks,
    updateUser
}