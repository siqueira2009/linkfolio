async function createProfile(bodyData) {
    const parsedLinks = bodyData.customLinks ? JSON.stringify(bodyData.customLinks) : []; 
    
    const data = {
        name: bodyData.name,
        pronouns: bodyData.pronouns,
        at: bodyData.at,
        bio: bodyData.bio,
        password: bodyData.password,
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
    
    const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return response.ok;
}

export {
    createProfile
}