import * as services from '../services/userServices.js'; // Importa as funções de serviço

// Função de controlar a coleta de dados do usuário pelo arroba
async function getUserByAt(req, res, at) {
    try { // Tenta pegar os dados do usuário
        const nedeedUser = await services.getUserByAt(at);
    
        if (!nedeedUser) { // Caso não exista, retorna erro
            return res.status(404).json({"erro": "Usuário não encontrado"});
        }
    
        return res.status(200).json(nedeedUser); // Caso exista, retorna seus dados
    } catch (error) { // Caso dê erro no serviço, mostra o erro e retorna o status code
        console.error("Erro no Controller [getUserByAt]:", error);
        return res.status(500);
    }
}

// Função para controlar a atualização das visualizações do usuário pelo arroba
async function updateViews(req, res, at) {
    try { // Tenta atualizar as visualizações
        const response = await services.updateViews(at)
    
        if (!response) { // Caso dê erro, retorna erro
            return res.status(500).json({"erro": "Não foi possível atualizar visualizações"});
        }
    
        return res.json({"mensagem": "Visualizações atualizadas"}); // Caso dê certo, retorna sucesso
    } catch (error) { // Caso dê erro no serviço, mostra o erro e retorna o status code
        console.error("Erro no Controller [updateViews]:", error);
        return res.status(500);
    }
}

// Função para controlar a atualização dos cliques do usuário pelo arroba
async function updateClicks(req, res, at) {
    try { // Tenta atualizar os cliques
        const response = await services.updateClicks(at)
    
        if (!response) { // Caso dê erro, retorna erro
            return res.status(500).json({"erro": "Não foi possível atualizar cliques"});
        }
    
        return res.json({"mensagem": "Cliques atualizadas"}); // Caso dê certo, retorna sucesso
    } catch (error) { // Caso dê erro no serviço, mostra o erro e retorna o status code
        console.error("Erro no Controller [updateClicks]:", error);
        return res.status(500);
    }

}

// Função para controlar a atualização de dados do usuário pelo arroba
async function updateUser(req, res, at, bodyData) {
    try { // Tenta atualizar o usuário
        const id = await services.updateUser(at, bodyData);
    
        if (id == null || id == undefined) { // Caso retorne nada, retorna erro
            return res.status(500).json({"mensagem": "Erro ao atualizar usuário!"});
        } else { // Caso retorne o ID, retorna sucesso
            return res.status(200).json({"mensagem": "Usuário atualizado com sucesso!"});
        }
    } catch (error) { // Caso dê erro no serviço, mostra o erro e retorna o status code
        console.error("Erro no Controller [updateUser]:", error);
        return res.status(500);
    }

}

// Função para controlar a criação de usuários
async function postUser(req, res, bodyData) {
    try { // Tenta criar o usuário
        const id = await services.postUser(bodyData);
    
        if (id == null || id == undefined) { // Se não retorna ID, retorna erro
            return res.status(500).json({"erro": "Não foi possível criar usuário"});
        } else if (id == "duplicated") { // Se retornar ID como "duplicated", retorna que usuário já existe
            return res.status(500).json({"erro": "Usuário com esse arroba já existe"});
        }
        
        return res.json({"mensagem": `Usuário @${bodyData.at} criado com sucesso`}); // Se der tudo certo, retorna sucesso
    } catch (error) { // Caso dê erro no serviço, mostra o erro e retorna o status code
        console.error("Erro no Controller [postUser]:", error);
        return res.status(500);
    }

}

// Função para controlar a deleção de usuário pelo arroba
async function deleteUser(req, res, at) {
    try { // Tenta deletar o usuário
        const success = await services.deleteUser(at);
    
        if (success == -1) { // Se não encontrar o usuário, retorna erro
            return res.status(404).json({"erro": "Usuário não encontrado!"});
        }
    
        res.json({"mensagem": `Usuário @${at} deletado com sucesso`}); // Caso encontre e delete usuário, retorna sucesso
    } catch (error) { // Caso dê erro no serviço, mostra o erro e retorna o status code
        console.error("Erro no Controller [deleteUser]:", error);
        return res.status(500);
    }

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