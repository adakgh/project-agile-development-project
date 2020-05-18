class ProfielRepository {
    constructor() {
        this.route = "/profiel";
    }

    async create( gebruikersnaam, name, achternaam, email, leeftijd, stad, telefoonnr, geslacht) {
        return await networkManager
            .doRequest(this.route, {
                username: gebruikersnaam,
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