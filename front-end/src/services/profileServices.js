// Pega a URL do backend nas variáveis do sistema
const BACKEND_URL = process.env.BACKEND_URL;

// Função de lógica de coleta de dados do usuário
async function getUser(at) {
    try { // Tenta requisitar o back-end para coletar dados do dados
        const user = await fetch(`${BACKEND_URL}/user/${at}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (!user.ok) { // Se der errado
            return null; // Retorna null
        }

        // Caso dê certo, transforma os dados em JSON legível
        const response = await user.json();
    
        // E depois atualiza a quantidade de visualizações
        await fetch(`${BACKEND_URL}/user/${at}/views`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        // Por fim, retorna os dados do usuário
        return response;
    } catch (error) { // Caso dê erro no fetch, mostra o erro e joga ele para o controller
        console.error("Erro no Service [getUser] ao tentar fazer fetch:", error);

        throw error;
    }
    
}

// Exporta as funções
export {
    getUser
}