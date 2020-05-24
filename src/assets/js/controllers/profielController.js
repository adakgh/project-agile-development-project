class ProfielController {
    constructor() {
        this.profielRepository = new ProfielRepository();

        $.get("views/gebruikersProfiel.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.gebruikersProfielView = $(htmlData);

        this.gebruikersProfielView.find(".name").html(sessionManager.get("naam, achternaam"));

        // this.loadEvents();

        $(".content").empty().append(this.gebruikersProfielView);

        //wanneer er op de wijzig knop wordt gedrukt
         this.gebruikersProfielView.find(".button").on("click", () => this.onAddPost());

        this.fetchRooms();
    }

    //html pagina waar je profiel kunt aanpassen wordt geopend
    onAddPost() {
        new ProfielAanpassenController();
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

    error() {
        $(".content").html("Failed to load content")
    }
}

