class ProfielController {
    constructor() {
        this.profielRepository = new ProfielRepository();

        $.get("views/gebruikersProfiel.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    async setup(htmlData) {
        this.gebruikersProfielView = $(htmlData);

        // this.gebruikersProfielView.find(".name").html(sessionManager.get("username, naam"));

        // this.loadEvents();
        try {
            const user =  await networkManager.doRequest("/user/get", {username: sessionManager.get("username") });
            this.currentUser = user[0]
        } catch (error) {
            console.log(error.message)
        }

        $(".content").empty().append(this.gebruikersProfielView);

        //wanneer er op de wijzig knop wordt gedrukt
         this.gebruikersProfielView.find(".button").on("click", () => this.onAddPost());

        this.fetchRooms();
        // this.username();
    }


    //html pagina waar je profiel kunt aanpassen wordt geopend
    onAddPost() {
        new ProfielAanpassenController();
    }

    async fetchRooms() {
        const exampleGebruikersnaam = this.gebruikersProfielView.find("#username");
        const exampleNaam = this.gebruikersProfielView.find("#naam");
        const exampleEmail = this.gebruikersProfielView.find("#email");
        const exampleLeeftijd = this.gebruikersProfielView.find("#leeftijd");
        const exampleGeslacht = this.gebruikersProfielView.find("#geslachtOpties");
        try {
            //await keyword 'stops' code until data is returned - can only be used in async function
            // const roomData = await this.registerRepository.get();

            const gebruiker = (JSON.stringify(sessionManager.get("username")).replace(/['"]+/g, ''));
            exampleGebruikersnaam.text( gebruiker)

        } catch (e) {
            console.log("error while fetching rooms", e);

            //for now just show every error on page, normally not all errors are appropriate for user
            exampleGebruikersnaam.text(e);
        }

        try {
            exampleNaam.text(this.currentUser.naam)
            exampleEmail.text(this.currentUser.email)
            exampleLeeftijd.text(this.currentUser.leeftijd)
            exampleGeslacht.text(this.currentUser.geslacht)
        }catch (i) {
            console.log("error while fetching rooms", i);

            //for now just show every error on page, normally not all errors are appropriate for user
            exampleNaam.text(i);
        }

        // try {
        //     console.log(sessionManager)
        //     console.log(sessionManager.get("email"));
        //     // const email = (JSON.stringify(sessionManager.get("email")).replace(/['"]+/g, ''));
        //     // exampleNaam.text( email)
        // }catch (a) {
        //     console.log("error while fetching rooms", a);
        //
        //     //for now just show every error on page, normally not all errors are appropriate for user
        //     exampleEmail.text(a);
        // }
    }

    error() {
        $(".content").html("Failed to load content")
    }
}

