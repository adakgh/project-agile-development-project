class activiteitenRepository {
    constructor() {
        this.route = "/event"
    }

    async create(name, personAmount, eventDate, description, place, eventTime) {
        return await networkManager
            .doRequest(this.route, {
                name: name,
                person_amount: personAmount,
                date: eventDate,
                status: description,
                place: place,
                time: eventTime
            })
    }

}