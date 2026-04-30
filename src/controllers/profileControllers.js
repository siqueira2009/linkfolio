import * as services from '../services/profileServices.js'; // Importa as funções de serviço

// Função de controle de coleta de dados do usuário
async function getUser(req, res, at) {
    try { // Tenta chamar o serviço de pegar usuário
        const response = await services.getUser(at);
    
        if (!response || !response.name) { // Caso não tenha usuário
           return res.redirect('/create'); // Leva para a página de criação
        }

        // Lógica para pegar as inicias do nome
        const nameParts = response.name.trim().split(/\s+/);

        if (nameParts.length > 1) {
            const first = nameParts[0][0];
            const last = nameParts[nameParts.length - 1][0];
            response.firstLetters = (first + last).toUpperCase();
        } else {
            response.firstLetters = nameParts[0][0].toUpperCase();
        }

        // Por fim...
        return res.render('pages/user.ejs', {user: response}); // Carrega a página do usuário
    } catch (error) { // Caso o fetch falhe, mostra e avisa o erro
        console.error("Erro no Controller [getUser]:", error);
        return res.status(500).json({ "erro": "Erro interno do back-end!" });
    }
}

// Exporta as funções
export {
    getUser
}