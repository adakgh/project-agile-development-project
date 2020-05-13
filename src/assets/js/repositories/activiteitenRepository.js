class activiteitenRepository {
    constructor() {
        this.route = "/event"
    }

    async create(name, personAmount, eventDate, description, place, eventBeginTime, eventEndTime) {
        return await networkManager
            .doRequest(this.route, {
                name: name,
                person_amount: personAmount,
                date: eventDate,
                status: description,
                place: place,
                begin_time: eventBeginTime,
                end_time: eventEndTime
            });
    }

    async getAll(name, personAmount, eventDate, description, place, eventBeginTime, eventEndTime) {
        return await networkManager
            .doRequest(`${this.route}/getAll`, {
                name: name,
                person_amount: personAmount,
                date: eventDate,
                status: description,
                place: place,
                begin_time: eventBeginTime,
                end_time: eventEndTime
            });
    }

    async delete(id) {
        return await networkManager
            .doRequest(`${this.route}/delete`, {
                id: id
            });
    }
}