class RegisterRepository {
    constructor() {
        this.route = "/user"
    }

    async getAll() {

    }

    async get(roomId) {
        return await networkManager
            .doRequest(this.route, {id: roomId});
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

    async register(username, password) {
        return await networkManager
            .doRequest(`${this.route}/login`, {"username": username, "password": password});
    }

    async delete() {

    }

    async update(id, values = {}) {

    }
}