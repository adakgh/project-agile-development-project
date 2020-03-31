class ProfielAanpassenRepository {
    constructor() {
        this.route = "/profiel";
    }

    async create( name, achternaam, email, leeftijd, stad, telefoonnr, geslacht) {
        return await networkManager
            .doRequest(this.route, {
                naam: name,
                achternaam: achternaam,
                email: email,
                leeftijd: leeftijd,
                stad: stad,
                telefoon_nummer: telefoonnr,
                geslacht: geslacht
            })
    }
}