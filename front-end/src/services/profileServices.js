// Função de lógica de coleta de dados do usuário
async function getUser(at) {
    try { // Tenta requisitar o back-end para coletar dados do dados
        const user = await fetch(`http://localhost:3000/user/${at}`, {
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
        await fetch(`http://localhost:3000/user/${at}/views`, {
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

// Função de lógica de atualização de dados do usuário
async function updateUser(at, bodyData) {
    try { // Tenta atualiza fazer um fetch para atualizar os dados
        const parsedLinks = bodyData.customLinks ? JSON.parse(bodyData.customLinks) : []; 
        
        const data = { // Dados formatados
            name: bodyData.name,
            pronouns: bodyData.pronouns,
            bio: bodyData.bio,
            color: bodyData.color,
            instagram: bodyData.instagram,
            linkedin: bodyData.linkedin,
            x: bodyData.x,
            github: bodyData.github,
            youtube: bodyData.youtube,
            discord: bodyData.discord,
            steam: bodyData.steam,
            facebook: bodyData.facebook,
            tiktok: bodyData.tiktok,
            links: parsedLinks
        }

        const response = await fetch(`http://localhost:3000/user/${at}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response.ok; // Retorna a resposta
    } catch (error) { // Caso dê erro no fetch, mostra o erro e joga ela para o controller
        console.error("Erro no Service [updateUser] ao tentar fazer fetch:", error);

        throw error;
    }
}

// Exporta as funções
export {
    getUser,
    updateUser
}