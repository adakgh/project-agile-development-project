class ProfielRepository{
    constructor(){
        this.route = "/profiel";
    }

    // async getAll(username) {
    //     return await networkManager
    //         .doRequest(this.route, {username : username});
    // }

    async getAll(username, naam, achternaam, email, leeftijd, stad, telefoon_nummer, geslacht) {
        return await networkManager
            .doRequest(`${this.route}/getAll`, {
                naam: name,
                achternaam: achternaam,
                email: email,
                leeftijd: leeftijd,
                stad: stad,
                telefoon_nummer: telefoonnr,
                geslacht: geslacht
            });
    }

    async create() {

    }

    async get() {
    }


    async update(username, naam, achternaam, email, leeftijd, stad, telefoon_nummer, geslacht) {
        return await networkManager
            .doRequest("/profiel", {
                username: gebruikersnaam,
                naam: name,
                achternaam: achternaam,
                email: email,
                leeftijd: leeftijd,
                stad: stad,
                telefoon_nummer: telefoonnr,
                geslacht: geslacht});
    }

    // async delete(username, naam, achternaam, email, leeftijd, stad, telefoon_nummer, geslacht) {
    //     return await networkManager
    //         .doRequest("/profiel", {
    //             username: gebruikersnaam,
    //             naam: name,
    //             achternaam: achternaam,
    //             email: email,
    //             leeftijd: leeftijd,
    //             stad: stad,
    //             telefoon_nummer: telefoonnr,
    //             geslacht: geslacht});
    // }
}

// class ProfielRepository {
//     constructor() {
//         this.route = "/profiel";
//     }
//
//     async create( gebruikersnaam, name, achternaam, email, leeftijd, stad, telefoonnr, geslacht) {
//         return await networkManager
//             .doRequest(this.route, {
//                 username: gebruikersnaam,
//                 naam: name,
//                 achternaam: achternaam,
//                 email: email,
//                 leeftijd: leeftijd,
//                 stad: stad,
//                 telefoon_nummer: telefoonnr,
//                 geslacht: geslacht
//             })
//     }
//
// }




