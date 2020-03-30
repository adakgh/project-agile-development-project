class RegisterRepository {
    constructor() {
        this.route = "/user";
    }

    async create(username, name, email, password, gender, age) {
        return await networkManager
            .doRequest(this.route, {
                username: username,
                naam: name,
                password: password,
                email: email,
                leeftijd: age,
                geslacht: gender
            })
    }
}