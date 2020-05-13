class chatRepository {
    constructor() {
        this.route = "/chat";
    }

    async get(id) {
        return await networkManager
            .doRequest(`${this.route}/get`, {
                id: id
            });
    }

    async delete() {

    }

    async update(id, values = {}) {

    }

}