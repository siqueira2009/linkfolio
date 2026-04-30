import fs from 'fs';
import { UserModel, SocialsModel } from '../models/userModels.js' // Importa os modelos de usuário e redes sociais

const jsonUserPath = 'src/data/users.json'; // Caminho do JSON com os dados do usuário

var users = []; // Variável que guarda os valores dos usuários (do JSON)

try { // Tenta ler o arquivo JSON com os valores dos usuários
    const data = fs.readFileSync(jsonUserPath, 'utf-8');
    users = JSON.parse(data);
    if (!Array.isArray(users)) users = [];
} catch (error) { // Caso dê erro, mostra o erro e faz a variável ser vazia e cria um arquivo novo e vazio
    console.error("Erro ao ler arquivo JSON, criando novo:", error);
    fs.writeFileSync(jsonUserPath, "[]", 'utf-8');
    users = [];
}

let idCounter = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1; // Variável que guarda os IDs

// Função para atualizar o arquivo JSON
function updateJSON() {
    try { // Tenta atualizar o arquivo
        for (let i = 0; i < users.length; i++) { // Para cada chave do Array de dados dos usuários, remove espaços do início e fim
            const userKeys = Object.keys(users[i]);
            const userValues = Object.values(users[i]);

            for (let j = 0; j < userKeys.length; j++) {
                if (typeof(userValues[j]) == "string") {
                    users[i][userKeys[j]] = userValues[j].trim();
                }
            }
        }

        fs.writeFileSync(jsonUserPath, JSON.stringify(users, null, 2), 'utf-8'); // Atualiza o JSON com os dados da variável
    } catch (error) { // Caso dê erro, mostra o erro
        console.log('Erro ao editar arquivo JSON: ' + error);
    }
};

// Função para pegar o arroba do usuário passado
function getAt(user) {
    return user.at;
}

// Função para pegar os dados do usuário pelo arroba passado
function getUserByAt(at) {
    const nedeedUser = users.find(u => u.at == at);

    return nedeedUser;
}

// Função para atualizar as visualizações no Array/JSON do usuário com arroba passado
function updateViews(at) {
    const nedeedUser = users.find(u => u.at == at);

    nedeedUser.views = nedeedUser.views + 1;

    updateJSON();
    return nedeedUser;
}

// Função para atualizar os cliques no Array/JSON do usuário com arroba passado
function updateClicks(at) {
    const nedeedUser = users.find(u => u.at == at);

    nedeedUser.clicks = nedeedUser.clicks + 1;

    updateJSON();
    return nedeedUser;
}

// Função para atualizar dados do usuário com arromba passado
function updateUser(at, bodyData) {
    const neededUserIndex = users.findIndex(u => u.at == at); 

    if (neededUserIndex == -1) return null;

    const user  = users.find(u => u.at == at);
    const userId = user.id;
    const userPassword = user.password;
    const userViews = user.views;
    const userClicks = user.clicks;

    users.splice(neededUserIndex, 1); // Remove o usuário

    // Cria novos objetos com os dados novos
    const userDetails = new UserModel(userId, bodyData.name, bodyData.pronouns, at, bodyData.bio, userPassword, bodyData.color);
    const userSocials = new SocialsModel(bodyData.instagram, bodyData.linkedin, bodyData.x, bodyData.github, bodyData.youtube, bodyData.discord, bodyData.steam, bodyData.facebook, bodyData.tiktok);
    const userLinks = Array.isArray(bodyData.links) ? bodyData.links : [];

    // Cria um novo objeto do novo usuário com todos os dados novos
    const newUser = {...userDetails, ...userSocials};
    newUser.links = userLinks;
    newUser.views = userViews;
    newUser.clicks = userClicks;

    // Adiciona esse usuário na mesma posição do removido (substitui)
    users.splice(neededUserIndex, 0, newUser);
    updateJSON();
    return newUser.id;
}

// Função para criar usuário com os dados passados
function postUser(bodyData) {
    const allAts = users.map(getAt); // Cria um Array com todos os arrobas existentes

    // Vê se o Array possui o arroba passado
    if (allAts.includes(bodyData.at)) {
        return "duplicated"; // Se possuir, retorna "duplicated"
    }

    // Caso não exista, cria novos objetos com os dados passados
    const userDetails = new UserModel(idCounter, bodyData.name, bodyData.pronouns, bodyData.at, bodyData.bio, bodyData.password, bodyData.color);
    const userSocials = new SocialsModel(bodyData.instagram, bodyData.linkedin, bodyData.x, bodyData.github, bodyData.youtube, bodyData.discord, bodyData.steam, bodyData.facebook, bodyData.tiktok);
    const userLinks = Array.isArray(bodyData.links) ? bodyData.links : [];

    // Cria um objeto com todos os dados
    const newUser = {...userDetails, ...userSocials};
    newUser.links = userLinks;

    // Adiciona esse objeto no Array de dados e atualiza o JSON
    users.push(newUser);
    updateJSON();
    idCounter++;
    return newUser.id;
}

// Função para deletar usuário com arroba passado
function deleteUser(at) {
    const userIndex = users.findIndex(u => u.at == at); // Encontra a posição do usuário

    // Remove ele do Array de dados dos usuários e atualiza o JSON
    idCounter--; 
    users.splice(userIndex, 1);
    updateJSON();

    return userIndex;
}

// Exporta as funções
export {
    getUserByAt,
    postUser,
    deleteUser,
    updateViews,
    updateClicks,
    updateUser
}