class ProfielAanpassenRepository {
    constructor() {
        this.route = "/profiel";
    }

    async create( name, email, stad, telefoonnr, leeftijd, geslacht) {
        return await networkManager
            .doRequest(this.route, {
                naam: name,
                email: email,
                stad: stad,
                telefoon_nummer: telefoonnr,
                leeftijd: leeftijd,
                geslacht: geslacht
            })
    }

    async getAll() {

    }
}