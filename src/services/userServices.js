import fs from 'fs';
import { UserModel, SocialsModel } from '../models/userModels.js'

const jsonTaskPath = 'src/data/users.json';
var idCounter = 0;

var users;

try {
    users = JSON.parse(fs.readFileSync(jsonTaskPath, 'utf-8'));
} catch (err) {
    fs.writeFileSync(jsonTaskPath, "[]", 'utf-8', (err) => {
        if (err) {
            console.log("Erro ao criar arquivo JSON: " + err);
        } else {
            console.log("Arquivo JSON de tarefas criado com sucesso!");
        }
    });

    users = JSON.parse(fs.readFileSync(jsonTaskPath, 'utf-8'));
}

function updateJSON() {
    fs.writeFile(jsonTaskPath, JSON.stringify(users, null, 2), (err) => {
        if (err) console.log('Erro ao editar arquivo JSON: ' + err);
    });
};

function getUserByUser(user) {
    console.log(user)

    const nedeedUser = users.find(u => u.user == user);

    return nedeedUser;
}

function postUser(name, user, at, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok) {
    const userDetails = new UserModel(idCounter++, name, user, at);
    const userSocials = new SocialsModel(instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok);
    const newUser = {...userDetails, ...userSocials};

    users.push(newUser);
    updateJSON();
    return newUser.id;
    idCounter++;
}

export {
    getUserByUser,
    postUser
}