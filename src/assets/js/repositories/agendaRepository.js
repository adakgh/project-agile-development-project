class agendaRepository {
    constructor() {
        this.route = "/agenda";
    }

    async getAll(date,time, status, place) {
        return await networkManager
            .doRequest(`${this.route}/getAll`, {
                date: date,
                time: time,
                status: status,
                place: place
            });
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