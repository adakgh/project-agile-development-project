class ProfielRepository{
    constructor(){
        this.route = "/user";
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

    async getAll(username, naam, email, stad, telefoonnr, leeftijd, geslacht) {
        return await networkManager
            .doRequest(`${this.route}/getAll`, {
                naam: naam,
                email: email,
                stad: stad,
                telefoon_nummer: telefoonnr,
                leeftijd: leeftijd,
                geslacht: geslacht
            });
    }


    //create

    async create(stad, telefoonnr) {
        return await networkManager
            .doRequest(this.route, {
                stad: stad,
                telefoon_nummer: telefoonnr
            })
    }

    // async create( naam, email, stad, telefoonnr, leeftijd, geslacht) {
    //     return await networkManager
    //         .doRequest(this.route, {
    //             naam: naam,
    //             email: email,
    //             stad: stad,
    //             telefoon_nummer: telefoonnr,
    //             leeftijd: leeftijd,
    //             geslacht: geslacht
    //         })
    // }

    async get(username) {
        return await networkManager.doRequest(this.route, {username : username});
    }

    // async get(naam) {
    //     return await networkManager.doRequest(this.route, {naam: naam});
    // }
    //
    // async get(email) {
    //     return await networkManager.doRequest(this.route, {email: email});
    // }
    //
    // async get(stad) {
    //     return await networkManager.doRequest(this.route, {stad: stad});
    // }



    async update(username, naam, email, stad, telefoonnr, leeftijd, geslacht) {
        return await networkManager
            .doRequest(`${this.route}/update`, {
                username: username,
                naam: naam,
                email: email,
                stad: stad,
                telefoon_nummer: telefoonnr,
                leeftijd: leeftijd,
                geslacht: geslacht});
    }

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

// async delete(username, naam, achternaam, email, leeftijd, stad, telefoon_nummer, geslacht) {
//     return await networkManager
//         .doRequest("/profiel", {
//             username: gebruikersnaam,
//             naam: naam,
//             achternaam: achternaam,
//             email: email,
//             leeftijd: leeftijd,
//             stad: stad,
//             telefoon_nummer: telefoonnr,
//             geslacht: geslacht});
// }
//
// }




