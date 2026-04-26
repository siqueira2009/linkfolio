class UserModel {
    constructor(id, name, pronouns, at, bio, password, color) {
        this.id = id,
        this.name = name,
        this.pronouns = pronouns,
        this.password = password,
        this.at = at,
        this.bio = bio
        this.color = color,
        this.views = 0;
        this.clicks = 0;
    }
}

class SocialsModel {
    constructor(instagram = null, linkedin = null, x = null, github = null, youtube = null, discord = null, steam = null, facebook = null, tiktok = null) {
        this.Instagram = instagram,
        this.LinkedIn = linkedin,
        this['X/Twitter'] = x,
        this.GitHub = github,
        this.YouTube = youtube,
        this.Discord = discord,
        this.Steam = steam,
        this.Facebook = facebook,
        this.TikTok = tiktok
    }
}

export {
    UserModel,
    SocialsModel
}