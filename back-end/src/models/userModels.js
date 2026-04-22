class UserModel {
    constructor(id, name, pronouns, at) {
        this.id = id,
        this.name = name,
        this.pronouns = pronouns,
        this.at = at
    }
}

class SocialsModel {
    constructor(instagram = null, linkedin = null, x = null, github = null, youtube = null, discord = null, steam = null, facebook = null, tiktok = null) {
        this.instagram = instagram,
        this.linkedin = linkedin,
        this.x = x,
        this.github = github,
        this.youtube = youtube,
        this.discord = discord,
        this.steam = steam,
        this.facebook = facebook,
        this.tiktok = tiktok
    }
}

export {
    UserModel,
    SocialsModel
}