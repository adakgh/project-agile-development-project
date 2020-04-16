class RegisterRepository {
    constructor() {
        this.route = "/user"
    }

    async getAll() {

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



    async delete() {

    }

    async update(id, values = {}) {

    }
}