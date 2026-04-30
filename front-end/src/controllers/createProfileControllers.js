import * as services from '../services/createProfileServices.js' // Importa as funções de serviço

// Função de controle de criação de perfil
async function createProfile(req, res, bodyData) {
    try { // Tenta chamar o serviço de criar perfil
        const success = await services.createProfile(bodyData);

        if (!success) { // Caso tenha dado errado, retora erro
            return res.status(500).json({"erro": "Erro ao criar perfil"})
        }

        // Caso tenha dado certo, redireciona para o novo perfil
        return res.redirect(`/u/${bodyData.at}`) 
    } catch (error) { // Caso o fetch falhe, mostra e avisa o erro
        console.error("Erro no Controller [createProfile]:", error);
        return res.status(500).json({"erro": "Erro interno do back-end!"});
    }

}

// Exporta as funções
export {
    createProfile
}