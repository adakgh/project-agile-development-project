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

    async participate(event_id, user_id) {
        return await networkManager
            .doRequest(`/participant/participate`, {
                event_id: event_id,
                user_id: user_id
            });
    }

    async getAgenda(id) {
        return await networkManager
            .doRequest(`/participate/getAgenda`, {
                id: id
            });
    }
}