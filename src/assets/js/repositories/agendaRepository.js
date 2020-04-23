class agendaRepository {
    constructor() {
        this.route = "/agenda";
    }

    async getAll(date,time, status, place) {
        return await networkManager
            .doRequest(this.route, {
                date: date,
                time: time,
                status: status,
                place: place
            });
    }

    async defer () {
        src: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
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