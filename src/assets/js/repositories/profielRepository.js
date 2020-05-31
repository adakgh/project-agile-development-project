class ProfielRepository{
    constructor(){
        this.route = "/user";
    }

    // async getAll(username) {
    //     return await networkManager
    //         .doRequest(this.route, {username : username});
    // }

    // setup(data) {
    //     //Load the welcome-content into memory
    //     this.gebruikersProfielView = $(data);
    //
    //     //Set the name in the view from the session
    //     this.gebruikersProfielView.find(".name").html(sessionManager.get("username"));
    //
    //     //Empty the content-div and add the resulting view to the page
    //     $(".content").empty().append(this.gebruikersProfielView);
    //
    //     this.fetchRooms();
    //     this.getEvents();
    // }

    // async getAll(username, naam, email, stad, telefoonnr, leeftijd, geslacht) {
    //     return await networkManager
    //         .doRequest(`${this.route}/getAll`, {
    //             naam: naam,
    //             email: email,
    //             stad: stad,
    //             telefoon_nummer: telefoonnr,
    //             leeftijd: leeftijd,
    //             geslacht: geslacht
    //         });
    // }



    async get(username) {
        return await networkManager.doRequest(this.route, {username : username});
    }


    async update(id, username, naam, email, geslacht, leeftijd, stad, telefoon_nummer) {
        return await networkManager
            .doRequest(`${this.route}/update`, {
                id: id,
                username: username,
                naam: naam,
                email: email,
                leeftijd: leeftijd,
                geslacht: geslacht,
                stad: stad,
                telefoon_nummer: telefoon_nummer
            })
    }
}



