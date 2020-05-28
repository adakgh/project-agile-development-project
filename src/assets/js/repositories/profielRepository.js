class ProfielRepository{
    constructor(){
        this.route = "/profiel";
    }

    // async getAll(username) {
    //     return await networkManager
    //         .doRequest(this.route, {username : username});
    // }

    setup(data) {
        //Load the welcome-content into memory
        this.gebruikersProfielView = $(data);

        //Set the name in the view from the session
        this.gebruikersProfielView.find(".name").html(sessionManager.get("username"));

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.gebruikersProfielView);

        this.fetchRooms();
        this.getEvents();
    }

    async getAll(username, naam, email, stad, telefoon_nummer, leeftijd, geslacht) {
        return await networkManager
            .doRequest(`${this.route}/getAll`, {
                naam: name,
                email: email,
                stad: stad,
                telefoon_nummer: telefoonnr,
                leeftijd: leeftijd,
                geslacht: geslacht
            });
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

    async get(username) {
        return await networkManager.doRequest(this.route, {username : username});
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




