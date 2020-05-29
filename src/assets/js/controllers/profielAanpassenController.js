class ProfielAanpassenController {
    constructor() {
        this.ProfielRepository = new ProfielRepository();

        $.get("views/gebruikersProfielAanpassen.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.gebruikersProfielAanpassenView = $(htmlData);

        $(".content").empty().append(this.gebruikersProfielAanpassenView);

        this.gebruikersProfielAanpassenView.find(".btn-primary").on("click", (event) => this.onAddEvent(event));
        this.gebruikersProfielAanpassenView.find(".btn-default").on("click", () => this.cancelPost());
    }

    async onAddEvent(event) {
        event.preventDefault();

        //verzamelen van gegevens
        const username = sessionManager.get("username");
        const naam = this.gebruikersProfielAanpassenView.find("#naam").val();
        const email = this.gebruikersProfielAanpassenView.find("#email").val();
        const stad = this.gebruikersProfielAanpassenView.find("#stad").val();
        const telefoonnr = this.gebruikersProfielAanpassenView.find("#telefoonnr").val();
        const leeftijd = this.gebruikersProfielAanpassenView.find("#leeftijd").val();
        const geslacht = this.gebruikersProfielAanpassenView.find("#geslachtOpties").val();

        console.log(` ${username} - ${naam} -  ${email} - ${stad} - ${telefoonnr} - ${leeftijd} - ${geslacht}`);

        //checken of belangrijke velden niet zijn leeggelaten
        if (username.length === 0 || naam.length === 0 || email.length === 0 || leeftijd.length === 0 || geslacht.length === 0 ) {
            alert("Gelieve uw gebruikersnaam, naam, email, leeftijd en geslacht in te vullen.");
        } else {
            try {
                //versturen naar repository
                await this.ProfielRepository.create(naam,email, stad, telefoonnr, leeftijd, geslacht);

                //doorsturen naar profiel.html
                alert("Uw gegevens zijn aangepast!");
                app.loadController(CONTROLLER_PROFIEL);
            } catch (e) {
                if (e.code === 401) {
                    this.gebruikersProfielAanpassenView
                        .find(".error")
                        .html(e.reason);
                } else {
                    console.log(e);
                }
            }
        }


        //versturen naar repository
        // try {
        //     const eventId = await this.profielAanpassenRepository.create(username, naam, email, stad, telefoonnr, leeftijd, geslacht);
        //     console.log(eventId);
        //     app.loadController(CONTROLLER_PROFIEL);
        // } catch (e) {
        //     console.log(e);
        // }

    }

    //annuleren-knop
    cancelPost() {
        //als er op "ok" en "annuleren" wordt gedrukt
        if (confirm("Weet u zeker dat u de wijzigingen wilt annuleren? Alle gegevens gaan dan verloren.")) {
            new ProfielController();
        } else {
        }
    }

    error() {
        $(".content").html("Failed to load content")
    }
}