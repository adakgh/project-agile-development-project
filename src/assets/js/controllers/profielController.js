class ProfielController {
    constructor() {
        this.profielRepository = new ProfielRepository();

        $.get("views/gebruikersProfiel.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.gebruikersProfielView = $(htmlData);

        this.gebruikersProfielView.find(".name").html(sessionManager.get("username"));

        // this.loadEvents();

        $(".content").empty().append(this.gebruikersProfielView);

        //wanneer er op de edit knop wordt gedrukt
         this.gebruikersProfielView.find(".button").on("click", () => this.onAddPost());

        this.fetchRooms();
    }

    async fetchRooms() {
        const exampleResponse = this.gebruikersProfielView.find(".gebruikersProfiel");
        try {
            //await keyword 'stops' code until data is returned - can only be used in async function
            // const roomData = await this.registerRepository.get();

            const gebruiker = (JSON.stringify(sessionManager.get("username")).replace(/['"]+/g, ''));
            exampleResponse.text( gebruiker)
        } catch (e) {
            console.log("error while fetching rooms", e);

            //for now just show every error on page, normally not all errors are appropriate for user
            exampleResponse.text(e);
        }
    }

    //html pagina waar je profiel kunt aanpassen wordt geopend
    onAddPost() {
        new ProfielAanpassenController();
    }

    error() {
        $(".content").html("Failed to load content")
    }
}

