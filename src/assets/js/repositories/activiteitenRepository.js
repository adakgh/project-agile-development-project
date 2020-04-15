class activiteitenRepository {
    constructor() {
        this.route = "/event"
    }

    async create(name, personAmount, eventDate) {
        return await networkManager
            .doRequest(this.route, {
                name: name,
                person_amount: personAmount,
                date: eventDate,
            })
    }

}