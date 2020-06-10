class RegisterRepository {
    constructor() {
        this.route = "/user"
    }

    async create(username, name, email, password, gender, age, newsletter) {
        return await networkManager
            .doRequest(`${this.route}/register`, {
                username: username,
                naam: name,
                password: password,
                email: email,
                leeftijd: age,
                geslacht: gender,
                newsletter: newsletter
            })
    }
}