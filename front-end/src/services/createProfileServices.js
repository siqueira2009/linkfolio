async function createProfile(name, pronouns, at, bio, instagram, linkedin, x, github, youtube, discord, steam, facebook, tiktok, customLinks) {
    const parsedLinks = customLinks ? JSON.parse(customLinks) : []; 
    
    const data = {
        name: name,
        pronouns: pronouns,
        at: at,
        bio: bio,
        instagram: instagram,
        linkedin: linkedin,
        x: x,
        github: github,
        youtube: youtube,
        discord: discord,
        steam: steam,
        facebook: facebook,
        tiktok: tiktok,
        links: parsedLinks
    }
    
    const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return response;
}

export {
    createProfile
}